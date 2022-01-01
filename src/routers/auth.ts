import express from 'express'

import { googleLogin, getUser, signup, localLogin } from '../controllers/auth'
import verifyToken from '../middlewares/tokenVerify'

const router = express.Router()

router.get('/verify', verifyToken, getUser)
router.post('/login/google', googleLogin)
router.post('/signup', signup)
router.post('/login', localLogin)

export default router