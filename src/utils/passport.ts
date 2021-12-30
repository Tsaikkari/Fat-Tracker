import passportJWT, { ExtractJwt } from 'passport-jwt'
import passportGoogle from 'passport-google-oauth20'

import AuthService from '../services/auth'

const JWTStrategy = passportJWT.Strategy
const GoogleStrategy = passportGoogle.Strategy

const jwt = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN
  },
  async (jwtPayload, done) => {
    const { userId } = jwtPayload
    const user = await AuthService.findById(userId)

    if (!user) return done(null, false)
    return done(null, user)
  }
)

const google = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email'],
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log('profile :', profile)
    const user = await AuthService.findOrCreate(profile)
    return done(null, user)
  }
)

export default { jwt, google }