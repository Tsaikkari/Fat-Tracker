import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import { getUsers, updateUser, getUserProfile } from '../controllers/user'

const router = express.Router()

router.get('/', verifyToken, getUsers)
router.get('/:userId', getUserProfile)
router.put('/:userId', updateUser)

export default router