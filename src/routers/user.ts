import express from 'express'
import { getUsers } from '../controllers/user'
import verifyToken from '../middlewares/tokenVerify'

const router = express.Router()

router.get('/', getUsers)

export default router