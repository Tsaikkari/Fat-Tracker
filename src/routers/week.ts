import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import {
  createWeek,
  updateWeek,
  deleteWeek,
  findAll,
  findUserWeeks,
} from '../controllers/week'

const router = express.Router()

router.get('/', verifyToken, findAll)
router.get('/user', verifyToken, findUserWeeks)
router.post('/', verifyToken, createWeek)
router.put('/:weekId', verifyToken, updateWeek)
router.patch('/:weekId', verifyToken, updateWeek)
router.delete('/:weekId', verifyToken, deleteWeek)

export default router
