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
      default: 0
    },
    goalWeight: {
      type: Number,
      default: 0
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