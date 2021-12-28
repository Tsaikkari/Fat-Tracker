import mongoose from 'mongoose'
import colors from 'colors'

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/fatTracker'
const DB_NAME = process.env.DB_NAME

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(
      `Connected to Mongo! Database name: "${DB_NAME}"`
    )
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err.red.bold)
  })
