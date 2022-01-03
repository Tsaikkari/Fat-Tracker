import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'
import bcrypt from 'bcryptjs'
import Mailgun from 'mailgun-js'
import jwt from 'jsonwebtoken'

import AuthService from '../services/auth'
import User from '../models/User'
import {
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  BadRequestError,
} from '../helpers/apiError'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const api_key = process.env.MG_API_KEY as string
const DOMAIN = process.env.MG_DOMAIN_NAME as string
const mg = new Mailgun({ apiKey: api_key, domain: DOMAIN })

// POST /api/auth/google
export const googleLogin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken } = req.body
    const response = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    //@ts-ignore
    const { email_verified, name, email } = response.payload
    const exists = await AuthService.findByEmail(email)

    if (exists && email_verified) {
      const serializedUser = await AuthService.signToken(exists)
      res.deliver(200, 'Success', serializedUser)
    } else {
      if (email_verified) {
        const newUser = await AuthService.create(name, email)
        const tokenizedUser = await AuthService.signToken(newUser)
        res.deliver(200, 'Success', tokenizedUser)
      } else {
        return next(new UnauthorizedError())
      }
    }
  } catch (err) {
    next(new InternalServerError())
  }
}

// POST /api/auth/signup
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body

    if (email === '' || password === '' || name === '') {
      next(new BadRequestError('Provide name, email and password'))
      return
    }

    const emailValid = email.includes('@')

    if (!emailValid) {
      next(new BadRequestError('Provide a valid email address.'))
      return
    }

    if (password.length < 8) {
      next(new BadRequestError('Password must have at least 8 characters'))
      return
    }
    const exists = await AuthService.findByEmail(email)

    if (exists) {
      return next(new BadRequestError('Email already exists'))
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_TOKEN as string,
      { expiresIn: '20m' }
    )

    const data = {
      from: 'cat@cat.com',
      to: email,
      subject: 'Account Activation Link',
      html: `
        <h2>Please click on the link to verify your account.</h2>
        <a href='${process.env.CLIENT_URL}/authentication/verify/${token}'>${process.env.CLIENT_URL}/authentication/verify/${token}</a>
      `,
    }

    mg.messages().send(data, function (err) {
      if (err) {
        res.deliver(404, 'Error')
        return next(new NotFoundError())
      }

      res.deliver(200, 'Email has been sent, please verify your account')
    })
  } catch (err) {
    if ('ValidationError') {
      next(new BadRequestError('Invalid Request'))
    } else {
      next(new InternalServerError('Internal Server Error'))
    }
  }
}

// POST /api/auth/email-verify
export const verifyAccountAndCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_TOKEN as string,
        async (err: any, decoded: any) => {
          if (err) {
            throw new Error(err.message)
          }

          const exists = await AuthService.findByEmail(decoded.email)

          if (exists) {
            throw new Error('Email already exists')
          }

          const newUser = await AuthService.create(
            decoded.name,
            decoded.email,
            decoded.password
          )
          const withoutPW = await User.findOne({ email: newUser.email }).select(
            '-password'
          )
          res.deliver(201, 'Success', withoutPW)
        }
      )
    }
  } catch (err) {
    next(new InternalServerError())
  }
}

// POST /api/auth/login
export const localLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await AuthService.findByEmail(email)

    if (user) {
      //@ts-ignore
      const isValid = bcrypt.compare(password, user.password)

      if (isValid) {
        const validatedUser = await AuthService.signToken(user)
        res.deliver(200, 'Success', validatedUser)
      }
    }
  } catch (err) {
    next(new InternalServerError())
  }
}

// GET /api/auth/verify
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    res.deliver(200, 'Success', user)
  } catch (err) {
    next(new InternalServerError())
  }
}
