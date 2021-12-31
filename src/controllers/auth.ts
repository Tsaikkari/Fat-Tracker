import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'

import User from '../models/User'
import AuthService from '../services/auth'
import {
  NotFoundError,
  InternalServerError,
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

    if (email_verified) {
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return next(new NotFoundError('User not found'))
        } else {
          if (user) {
            const serializedUser = AuthService.signToken(user)
            console.log('serializedUser', serializedUser)
            res.deliver(200, 'Success', serializedUser)
          } else {
            const newUser = AuthService.create(name, email)
            if (err) {
              return next(new InternalServerError())
            }
            const tokenizedUser = AuthService.signToken(newUser)
            console.log(tokenizedUser, 'TOKENEDUSER')
            res.deliver(200, 'Success', tokenizedUser)
          }
        }
      })
    }
  } catch (err) {
    next(new Error())
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
    console.log(req.user, 'REQUSER')
    res.deliver(200, 'Success', user)
  } catch (err) {
    next(new InternalServerError())
  }
}

