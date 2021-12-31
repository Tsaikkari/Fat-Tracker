import { Schema, Document, model } from 'mongoose'

export type FattyFoodDocument = Document & {
  name: String
  chosenDate: Date
  actualDate: Date[]
  user: Schema.Types.ObjectId
}

const fattyFoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    chosenDate: {
      type: Date,
      required: true
    },
    actualDate: [Date],
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

export default model<FattyFoodDocument>('FattyFood', fattyFoodSchema)