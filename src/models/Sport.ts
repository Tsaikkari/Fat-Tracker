import { Schema, Document, model } from 'mongoose'

export type SportDocument = Document & {
  name: String
  date: Date
  duration: Number
  user: Schema.Types.ObjectId
}

const sportSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: Date,
    duration: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

export default model<SportDocument>('Sport', sportSchema)