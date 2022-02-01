import { Schema, Document, model } from 'mongoose'

export type FattyFoodDocument = Document & {
  name: String
  chosenDate: String
  user: Schema.Types.ObjectId
  week: Schema.Types.ObjectId
}

const fattyFoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    chosenDate: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    week: { type: Schema.Types.ObjectId, ref: 'Week' },
  },
  {
    timestamps: true,
  }
)

export default model<FattyFoodDocument>('FattyFood', fattyFoodSchema)
