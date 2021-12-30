import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { InternalServerError, UnauthorizedError } from '../helpers/apiError'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', function(err, user) {
    if (err) {
      return next(new InternalServerError())
    }

    if (!user) {
      return next(new UnauthorizedError('Invalid token, please login'))
    }

    req.user = user
    return next()
  })(req, res, next)
}

export default verifyToken

