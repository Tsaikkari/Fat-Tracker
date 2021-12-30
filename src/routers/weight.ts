import express from 'express'
import { createWeight } from '../controllers/weight'

const router = express.Router()

router.post('/', createWeight)

export default router