import User, { UserDocument } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const jwtToken = process.env.JWT_TOKEN

const findOrCreate = async (profile: any): Promise<UserDocument> => {
  const googleId = profile.id
  const user = await User.findOne({ googleId }).populate('week', 'fattyFoods weights sports')

  if (!user) {
    const newUser = User.create({
      googleId: profile.id,
      name: profile.name.givenName,
      email: profile.emails[0].value,
      imageUrl: profile.photos[0].value,
      isAdmin: false
    })

    return newUser
  }
  return user
}

const create = async (name: string, email: string): Promise<UserDocument> => {
  const hashedPassword = await hashPassword(name, email)
  return User.create({
    name,
    email,
    password: hashedPassword,
    //imageUrl,
    isAdmin: false
  })
}

const findById = async (id: string): Promise<UserDocument | null> => {
  const user = await User.findById(id).populate('week', 'fattyFoods weights sports')
  
  return user
}

const findByEmail = async (email: string): Promise<UserDocument | null> => {
  const user = await User.findOne({ email })
    .populate('week', 'fattyFoods weights sports')

  return user
}

const signToken = async (user: any) => {
  const token = jwt.sign({ _id: user._id}, jwtToken as string, { expiresIn: '1d' })
  const { _id, name, email } = user
  const userSerialized = { _id, name, email, token }
  return userSerialized
}

const hashPassword = async (name: string, email: string) => {
  const password = await bcrypt.hash(name, 10)
  return password
}

export default { findOrCreate, create, findById, findByEmail, signToken, hashPassword }