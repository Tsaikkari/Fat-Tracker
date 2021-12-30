import User, { UserDocument } from '../models/User'

// const findOrCreate = async (profile: any): Promise<UserDocument> => {
//   const googleId = profile.id
//   const user = await User.findOne({ googleId }).populate('week', 'fattyFoods weights sports')

//   if (!user) {
//     const newUser = User.create({
//       googleId: profile.id,
//       name: profile.name.givenName,
//       email: profile.emails[0].value,
//       photo: profile.photos[0].value,
//       isAdmin: false
//     })

//     return newUser
//   }
//   return user
// }

const create = async (name: string, email: string, password: string): Promise<UserDocument> => {
  return User.create({
    name,
    email,
    isAdmin: false
  })
}

const findById = async (id: string): Promise<UserDocument | null> => {
  const user = await User.findById(id).populate('week', 'fattyFoods weights sports')
  
  return user
}

export default { create, findById }