import User, { UserDocument } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const jwtToken = process.env.JWT_TOKEN

const create = async (
  name: string,
  email: string,
  password?: string
): Promise<UserDocument> => {
  if (!password) {
    const hashedPassword = await bcrypt.hash(name, 10)

    return User.create({
      name,
      email,
      password: hashedPassword,
    })
  } else {
    return User.create({
      name,
      email,
      password,
    })
  }
}

const findById = async (id: string): Promise<UserDocument | null> => {
  const user = await User.findById(id).select('-password')

  return user
}

const findByEmail = async (email: string): Promise<UserDocument | null> => {
  const user = await User.findOne({ email })

  return user
}

const signToken = async (user: any) => {
  const token = jwt.sign({ _id: user._id }, jwtToken as string, {
    expiresIn: '1d',
  })
  const { _id } = user
  const userInfo = await User.findById(_id).select('-password')
  if (userInfo) {
    const payload = { userInfo, token }
    return payload
  }
  return null
}

export default { create, findById, findByEmail, signToken }