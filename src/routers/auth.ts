import express from 'express'

import { googleLogin, getUser } from '../controllers/auth'
import verifyToken from '../middlewares/tokenVerify'

const router = express.Router()

router.get('/verify', verifyToken, getUser)
router.post('/login/google', googleLogin)

export default router