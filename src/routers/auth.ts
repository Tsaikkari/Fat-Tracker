import express from 'express'
import passport from 'passport'

import { googleLogin, googleLogin2 } from '../controllers/auth'

const router = express.Router()

router.post('/login/google', googleLogin)

router.post('/google/callback', 
  passport.authenticate('google', {
    scope: ['profile', 'email'], 
    session: false
  }),
  googleLogin2
)

export default router