import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import {
  updateWeight,
  deleteWeight,
  findAll,
  findUserWeight,
  createWeight
} from '../controllers/weight'

const router = express.Router()

router.get('/', verifyToken, findAll)
router.get('/user', verifyToken, findUserWeight)
router.post('/', verifyToken, createWeight)
router.put('/:weightId', verifyToken, updateWeight)
router.delete('/:weightId', verifyToken, deleteWeight)

export default router
