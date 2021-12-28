import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import './db/index'

const app = express()
  
app.use(express.json())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world')
})

export default app