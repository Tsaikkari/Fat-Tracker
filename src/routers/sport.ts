import express from 'express'

import verifyToken from '../middlewares/tokenVerify'
import {
  createSport,
  updateSport,
  deleteSport,
  findAll,
  findUserSport,
} from '../controllers/sport'

const router = express.Router()

router.get('/', verifyToken, findAll)
router.get('/user', verifyToken, findUserSport)
router.post('/', verifyToken, createSport)
router.put('/:sportId', verifyToken, updateSport)
router.delete('/:sportId', verifyToken, deleteSport)

export default router
