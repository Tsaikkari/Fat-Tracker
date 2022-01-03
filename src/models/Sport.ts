import { Schema, Document, model } from 'mongoose'

export type SportDocument = Document & {
  name: String
  date: String
  duration: Number
  user: Schema.Types.ObjectId
  week: Schema.Types.ObjectId
}

const sportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: String,
    duration: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    week: { type: Schema.Types.ObjectId, ref: 'Week' },
  },
  {
    timestamps: true,
  }
)

export default model<SportDocument>('Sport', sportSchema)
