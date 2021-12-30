import express from 'express'
import { updateWeight } from '../controllers/weight'

const router = express.Router()

router.put('/:weightId', updateWeight)

export default router