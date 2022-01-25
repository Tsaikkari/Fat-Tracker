import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import { getUsers, updateUser, getUserProfile } from '../controllers/user'

const router = express.Router()

router.get('/', verifyToken, getUsers)
router.get('/:userId', verifyToken, getUserProfile)
router.put('/:userId', verifyToken, updateUser)

export default router