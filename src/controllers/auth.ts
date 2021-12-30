import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import {OAuth2Client} from 'google-auth-library'
import bcrypt from 'bcryptjs'

import User, { UserDocument } from './../models/User'
import AuthService from '../services/auth'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const jwtToken = process.env.JWT_TOKEN

export const googleLogin = async (
  req: any, 
  res: Response,
  next: NextFunction
) => {
  try {
    const { idToken } = req.body
    const res = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID})
    //@ts-ignore
    const { email_verified, name, email } = res.payload
    //@ts-ignore
    console.log(res.payload)
    if (email_verified) {
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          throw new Error()
        } else {
          if (user) {
            AuthService.signToken(user)
          } else {
            // TODO: fix this is pending forever
            const newUser = AuthService.create(name, email)
            console.log('NEWUSER', newUser)
            if (err) {
              return next(new Error())
            }
            AuthService.signToken(newUser)
            console.log(newUser, 'NEWUSER')
          }
        }
      })
        
    }
  } catch (err) {
    next(new Error())
  }
}

// export const googleLogin = async (
//   req: any, 
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { idToken } = req.body
//     const res = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID})
//     //@ts-ignore
//     const { email_verified, name, email } = res.payload
//     //@ts-ignore
//     console.log(res.payload)
//     if (email_verified) {
//       User.findOne({ email }).exec((err, user) => {
//         if (err) {
//           return next(new Error())
//         } else {
//           if (user) {
//             const token = jwt.sign({ _id: user._id}, jwtToken as string, { expiresIn: '1d' })
//             const { _id, name, email } = user
//             const userSerialized = { _id, name, email, token }
//             console.log(userSerialized, 'USERSERIALIZED')
//           } else {
//             let password = bcrypt.hash(name, 8)
//             // TODO: fix
//             const newUser = AuthService.create(name, email, password)
//             console.log('NEWUSER', newUser)
//             if (err) {
//               return next(new Error())
//             }
//             // TODO: token
//             console.log(newUser, 'NEWUSER')
//           }
//         }
//       })
//     }
//   } catch (err) {
//     next(new Error())
//   }
// }

export const googleLogin2 = async (
  req: any, 
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id
    const user = await AuthService.findById(id) as UserDocument
    const token = jwt.sign({ id }, process.env.JWT_TOKEN as string)

    const userSerialized = { ...user, token }
    res.deliver(200, 'Success', userSerialized)
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
}

