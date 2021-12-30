import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// GET api/users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await UserService.findAll())
  } catch (err) {
    next(new NotFoundError('users not found'))
  }
}



