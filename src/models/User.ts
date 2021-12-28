import { Schema, Document, model } from 'mongoose'

export type UserDocument = Document & {
  username: String
  googleId: String
  imgPath: String
  isAdmin: Boolean
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    googleId: {
      type: String, 
      required: true, 
      default: true
    },
    imgPath: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export default model<UserDocument>('User', userSchema)