import { Request, Response, NextFunction } from 'express'

import Weight from '../models/Weight'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// PUT api/weight/:weightId
export const updateWeight = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const updatedWeight = await Weight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.status(200).json(updatedWeight)
  } catch (err) {
    next(new NotFoundError('Weight not found'))
  }
}