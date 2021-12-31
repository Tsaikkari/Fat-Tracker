import { Schema, Document, model } from 'mongoose'

export type WeekDocument = Document & {
  date: Date,
  fattyFoods: Schema.Types.ObjectId
  weight: Schema.Types.ObjectId
  sports: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
}

const weekSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    fattyFoods: [{ type: Schema.Types.ObjectId, ref: 'FattyFood' }],
    weight: { type: Schema.Types.ObjectId, ref: 'Weight' },
    sports: [{ type: Schema.Types.ObjectId, ref: 'Sport' }],
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
)

export default model<WeekDocument>('Week', weekSchema)