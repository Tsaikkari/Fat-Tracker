import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import {
  googleLogin,
  getUser,
  signup,
  localLogin,
  verifyAccountAndCreateUser,
} from '../controllers/auth'

const router = express.Router()

router.get('/verify', verifyToken, getUser)
router.post('/login/google', googleLogin)
router.post('/signup', signup)
router.post('/login', localLogin)
router.post('/email-activate', verifyAccountAndCreateUser)

export default router
