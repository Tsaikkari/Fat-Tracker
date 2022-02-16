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
    const weights = await Weight.find({ user })

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

    console.log(req.body, 'req.body')
    if (userId) {
      const weight = new Weight({
        currentWeight,
        goalWeight,
        user: userId,
        week: weekId
      })

      const createdWeight = await WeightService.createWeight(weight)
      res.deliver(201, 'Success', createdWeight)
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
