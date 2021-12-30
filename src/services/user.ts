import User, { UserDocument } from '../models/User'

function findAll(): Promise<UserDocument[]> {
  return User.find()
    .sort({ name: 1, isAdmin: -1 })
    .exec() 
}

export default { findAll }

