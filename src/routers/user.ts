import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import { getUsers, updateUser } from '../controllers/user'

const router = express.Router()

router.get('/', verifyToken, getUsers)
router.put('/:userId', updateUser)

export default router