import { Request, Response, NextFunction } from 'express'

import FattyFoodService from '../services/fattyFood'
import FattyFood from '../models/FattyFood'
import Week from '../models/Week'
import { NotFoundError, InternalServerError } from '../helpers/apiError'

// GET /api/fattyfoods
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fattyFoods = await FattyFoodService.findAll()
    res.deliver(200, 'Success', fattyFoods)
  } catch (error) {
    next(new NotFoundError('FattyFoods not found'))
  }
}

// GET /api/fattyfoods/user
export const findUserFattyFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    const fattyFoods = await FattyFood.find({ user }).populate(
      'user',
      'id name chosenDate week'
    )

    res.deliver(200, 'Success', fattyFoods)
  } catch (err) {
    next(new NotFoundError('User fattyfoods not found'))
  }
}

// POST /api/fattyfoods
export const createFattyFood = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, chosenDate, weekId } = req.body
    const userId = req.user._id

    if (userId) {
      const fattyFood = new FattyFood({
        name,
        chosenDate,
        user: userId,
        week: weekId
      })

      const createdFattyFood = await FattyFoodService.createFattyFood(fattyFood)

      const updatedWeek = await Week.findByIdAndUpdate(
        fattyFood.week,
        {
          $push: { fattyFoods: createdFattyFood._id}
        }
      )

      res.deliver(201, 'Success', updatedWeek)
    }
  } catch (err) {
    next(new InternalServerError())
  }
}

// PUT /api/fattyfoods/:fattyFoodId
export const updateFattyFood = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedFattyFood = await FattyFoodService.updateFattyFood(
      req.params.fattyFoodId,
      req.body
    )
    res.deliver(201, 'Updated', updatedFattyFood)
  } catch (err) {
    next(new NotFoundError(`FattyFood ${req.params.fattyFoodId} not found`))
  }
}

// DELETE api/fattyfoods/:fattyFoodId
export const deleteFattyFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await FattyFoodService.deleteFattyFood(req.params.fattyFoodId)
    res.deliver(204, 'Deleted')
  } catch (err) {
    next(new InternalServerError())
  }
}
