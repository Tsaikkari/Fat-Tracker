import { Schema, Document, model } from 'mongoose'

export type WeightDocument = Document & {
  currentWeight: Number
  goalWeight: Number
  user: Schema.Types.ObjectId
}

const weightSchema = new Schema(
  {
    currentWeight: {
      type: Number,
      required: true
    },
    goalWeight: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default model<WeightDocument>('Weight', weightSchema)