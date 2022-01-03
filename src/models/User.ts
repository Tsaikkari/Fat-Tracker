import { Schema, Document, model } from 'mongoose'

export type UserDocument = Document & {
  name: String
  email: String
  password: String
  googleId: String
  imageUrl: String
  isAdmin: Boolean
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    imageUrl: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default model<UserDocument>('User', userSchema)
