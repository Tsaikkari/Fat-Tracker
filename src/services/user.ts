import User, { UserDocument } from '../models/User'

const findAll = (): Promise<UserDocument[]> => {
  return User.find()
    .sort({ name: 1, isAdmin: -1 })
    .exec() 
}

const getProfile = async (userId: string): Promise<UserDocument> => {
  return await User.findById(userId)
    .exec() 
    .then((user) => {
      if (!user) {
        throw new Error(`User ${user} not found.`)
      }

      return user
    })
}

const updateUser = async (userId: string, update: Partial<UserDocument>): Promise<UserDocument> => {
  return await User.findByIdAndUpdate(userId, update)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${user} not found.`)
      }

      return user
    })
}

export default { findAll, updateUser, getProfile }

