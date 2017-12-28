const passport = require('passport')
const JWT = require('jsonwebtoken')
const User = require('../models/User')

const jwtSecret = 'placeholder-jwt-secret'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error)
      return
    }
    req.user = user
    next()
  })
}

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create signed token
  const token = JWT.sign(
    {
      email: user.email
    },
      // secret
      jwtSecret,
    // options
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString() 
    }
  )
  // Send the token
  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  signJWTForUser
}