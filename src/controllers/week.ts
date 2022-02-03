import { Request, Response, NextFunction } from 'express'

import WeekService from '../services/week'
import Week from '../models/Week'
import { NotFoundError, InternalServerError } from '../helpers/apiError'

// GET /api/weeks
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const weeks = await WeekService.findAll()
    res.deliver(200, 'Success', weeks)
  } catch (error) {
    next(new NotFoundError('Weeks not found'))
  }
}

// GET /api/weeks/user
export const findUserWeeks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    if (user) {
      const weeks = await Week.find({ user })
        .populate('sports', 'id sport duration date')
        .populate('weights', 'id currentWeight goalWeight achievedWeight')
        .populate('fattyFoods', 'id name chosenDate')

      res.deliver(200, 'Success', weeks)
    }
  } catch (err) {
    next(new NotFoundError('User weeks not found'))
  }
}

// POST /api/weeks
export const createWeek = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.body
    const userId = req.user._id

    if (userId) {
      const week = new Week({
        date,
        fattyFoods: [],
        weights: [],
        sports: [],
        user: userId,
      })

      const createdWeek = await WeekService.createWeek(week)
      res.deliver(201, 'Success', createdWeek)
    }
  } catch (err) {
    next(new InternalServerError())
  }
}

// PUT /api/weeks/:weekId
export const updateWeek = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedWeek = await WeekService.updateWeek(req.params.weekId, req.body)
    res.deliver(201, 'Updated', updatedWeek)
  } catch (err) {
    next(new NotFoundError(`Week ${req.params.weekId} not found`))
  }
}

// DELETE api/weeks/:weekId
export const deleteWeek = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await WeekService.deleteWeek(req.params.weekId)
    res.deliver(204, 'Deleted')
  } catch (err) {
    next(new InternalServerError())
  }
}
