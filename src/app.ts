import express from 'express'
import passport from 'passport'
import cors from 'cors'
import 'dotenv/config'
import './db/index'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import responseHandler from './middlewares/responseHandler'
import PassportStrategy from './utils/passport'

import authRouter from './routers/auth'
import userRouter from './routers/user'
import weightRouter from './routers/weight'

const app = express()
  
app.use(express.json())

app.use(
  cors({
    origin: '*', 
    credentials: true,           
  })
)
app.use(passport.initialize());

passport.use(PassportStrategy.jwt)

app.use(responseHandler)

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/weight', weightRouter)

// custom API error handler
app.use(apiErrorHandler)
app.use(apiContentType)

export default app