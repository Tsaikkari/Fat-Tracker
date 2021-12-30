import express from 'express'
import passport from 'passport'

import { googleLogin } from '../controllers/auth'

const router = express.Router()

router.post('/login/google', googleLogin)

router.post('/google/callback', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }),
  googleLogin
)

export default router