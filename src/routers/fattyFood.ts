import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import {
  createFattyFood,
  updateFattyFood,
  deleteFattyFood,
  findAll,
  findUserFattyFoods,
} from '../controllers/fattyFood'

const router = express.Router()

router.get('/', verifyToken, findAll)
router.get('/user', verifyToken, findUserFattyFoods)
router.post('/', verifyToken, createFattyFood)
router.put('/:fattyFoodId', verifyToken, updateFattyFood)
router.delete('/:fattyFoodId', verifyToken, deleteFattyFood)

export default router
