import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'
import bcrypt from 'bcryptjs'

import User from '../models/User'
import AuthService from '../services/auth'
import {
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  BadRequestError,
} from '../helpers/apiError'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

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
    const exists = await User.findOne({ email })

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

    const newUser = await AuthService.create(name, email)
    res.deliver(201, 'Success', newUser)
  } catch (err) {
    next(new NotFoundError())
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
    const user = await User.findOne({ email })

    if (user) {
      //@ts-ignore
      const isValid = bcrypt.compare(password, user.password)
      console.log(isValid, 'ISVALID')

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
