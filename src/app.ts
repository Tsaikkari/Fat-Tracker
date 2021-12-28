import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import './db/index'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import responseHandler from './middlewares/responseHandler'

const app = express()
  
app.use(express.json())

app.use(responseHandler)

// custom API error handler
app.use(apiErrorHandler)
app.use(apiContentType)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world')
})

export default app