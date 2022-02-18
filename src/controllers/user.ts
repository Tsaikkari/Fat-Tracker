import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// GET api/users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (err) {
    next(new NotFoundError('users not found'))
  }
}

// GET api/users/profile
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileInfo = await UserService.getProfile(req.params.userId)

    if (profileInfo) {
      res.deliver(200, 'Success', profileInfo)
    }
  } catch (err) {
    next(new NotFoundError('User not found'))
  }
}

// PUT api/users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await UserService.updateUser(
      req.params.userId,
      req.body
    )
    res.deliver(201, 'Updated', updatedUser)
  } catch (err) {
    next(new NotFoundError('User not found'))
  }
}
