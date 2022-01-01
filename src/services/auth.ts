import User, { UserDocument } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const jwtToken = process.env.JWT_TOKEN

const create = async (name: string, email: string): Promise<UserDocument> => {
  const hashedPassword = await bcrypt.hash(name, 10)
  return User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: false
  })
}

const findById = async (id: string): Promise<UserDocument | null> => {
  const user = await User.findById(id).populate('week', 'fattyFoods weights sports')
  
  return user
}

const signToken = async (user: any) => {
  const token = jwt.sign({ _id: user._id }, jwtToken as string, { expiresIn: '1d' })
  const { _id, name, email } = user
  const userInfo = await User.findById(_id)
  if (userInfo) {
    const payload = { userInfo, token }
    return payload
  }
  return null
}

export default { create, findById, signToken }