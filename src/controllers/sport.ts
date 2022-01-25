import { Request, Response, NextFunction } from 'express'

import SportService from '../services/sport'
import Sport from '../models/Sport'
import Week from '../models/Week'
import { NotFoundError, InternalServerError } from '../helpers/apiError'

// GET /api/sports
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sports = await SportService.findAll()
    res.deliver(200, 'Success', sports)
  } catch (error) {
    next(new NotFoundError('Sport not found'))
  }
}

// GET /api/sports/user
export const findUserSport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    const sports = await Sport.find({ user }).populate(
      'user',
      'id name date duration week'
    )

    res.deliver(200, 'Success', sports)
  } catch (err) {
    next(new NotFoundError('Sports not found'))
  }
}

// POST /api/sports
export const createSport = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sport, date, duration, weekId } = req.body
    const userId = req.user._id

    if (userId) {
      const sporty = new Sport({
        sport, 
        date, 
        duration, 
        user: userId,
        week: weekId
      })

      const createdSport = await SportService.createSport(sporty)
    
      const updatedWeek = await Week.findByIdAndUpdate(
        sporty.week, 
        {
          $push: { sports: createdSport._id }
        }
      )

      res.deliver(201, 'Success', updatedWeek)
    }
  } catch (err) {
    next(new InternalServerError())
  }
}

// PUT /api/sports/:sportId
export const updateSport = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedSport = await SportService.updateSport(req.params.sportId, req.body)
    res.deliver(201, 'Updated', updatedSport)
  } catch (err) {
    next(new NotFoundError(`Sport ${req.params.sportId} not found`))
  }
}

// DELETE api/sports/:sportId
export const deleteSport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SportService.deleteSport(req.params.sportId)
    res.deliver(204, 'Deleted')
  } catch (err) {
    next(new InternalServerError())
  }
}
