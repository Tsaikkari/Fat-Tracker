import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'

import User from '../models/User'
import AuthService from '../services/auth'
import {
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
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
      //console.log('serializedUser', serializedUser)
      res.deliver(200, 'Success', serializedUser)
    } else {
      if (email_verified) {
        const newUser = await AuthService.create(name, email)
        const tokenizedUser = await AuthService.signToken(newUser)
        //console.log(tokenizedUser, 'TOKENIZEDUSER')
        res.deliver(200, 'Success', tokenizedUser)
      } else {
        return next (new UnauthorizedError())
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
    console.log(req.user, 'REQUSER')
    res.deliver(200, 'Success', user)
  } catch (err) {
    next(new InternalServerError())
  }
}

