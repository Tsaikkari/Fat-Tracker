import passportJWT, { ExtractJwt } from 'passport-jwt'

import AuthService from '../services/auth'

const JWTStrategy = passportJWT.Strategy

const jwt = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN
  },
  async (jwtPayload, done) => {
    const user = await AuthService.findById(jwtPayload._id)
    console.log(user, 'USER')

    if (!user) return done(null, false)
    return done(null, user)
  }
)

export default { jwt }