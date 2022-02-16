import { Schema, Document, model } from 'mongoose'

export type WeekDocument = Document & {
  date: String
  fattyFoods: Schema.Types.ObjectId
  weights: Schema.Types.ObjectId
  sports: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

const weekSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  weights: {
    currentWeight: Number,
    goalWeight: Number,
    achievedWeight: Number
  },
  fattyFoods: [{ type: Schema.Types.ObjectId, ref: 'FattyFood' }],
  sports: [{ type: Schema.Types.ObjectId, ref: 'Sport' }],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

export default model<WeekDocument>('Week', weekSchema)
