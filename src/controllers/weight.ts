import { Request, Response, NextFunction } from 'express'

import WeightService from '../services/weight'
import Weight from '../models/Weight'
import Week from '../models/Week'
import { NotFoundError, InternalServerError } from '../helpers/apiError'

// GET /api/weights
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const weights = await WeightService.findAll()
    res.deliver(200, 'Success', weights)
  } catch (error) {
    next(new NotFoundError('Weight not found'))
  }
}

// GET /api/weights/user
export const findUserWeight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    const weights = await Weight.find({ user }).populate(
      'user',
      'id currentWeight goalWeight achievedWeight week'
    )

    res.deliver(200, 'Success', weights)
  } catch (err) {
    next(new NotFoundError('Weights not found'))
  }
}

// POST api/weights
export const createWeight = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentWeight, goalWeight, weekId } = req.body
    const userId = req.user._id

    if (userId) {
      const weight = new Weight({
        currentWeight,
        goalWeight,
        user: userId,
        week: weekId
      })

      const createdWeight = await WeightService.createWeight(weight)
    
      const updatedWeek = await Week.findByIdAndUpdate(
        weight.week, 
        {
          $push: { weights: createdWeight._id }
        }
      )

      res.deliver(201, 'Success', updatedWeek)
    }
  } catch (err) {
    next(new InternalServerError())
  }
}

// PUT api/weights/:weightId
export const updateWeight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedWeight = await WeightService.updateWeight(
      req.params.weightId,
      req.body
    )

    res.deliver(200, 'Updated', updatedWeight)
  } catch (err) {
    next(new NotFoundError(`Weight ${req.params.weightId} not found`))
  }
}

// DELETE api/weights/:weightId
export const deleteWeight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await WeightService.deleteWeight(req.params.weightId)
    res.deliver(204, 'Deleted')
  } catch (err) {
    next(new InternalServerError())
  }
}
