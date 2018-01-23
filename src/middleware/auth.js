const passport = require('passport')
const JWT = require('jsonwebtoken')
const passportJwt = require('passport-jwt')
const User = require('../models/User')

const jwtSecret = 'placeholder-jwt-secret'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    postCode: req.body.postCode,
    state: req.body.state,
    mobileNumber: req.body.mobileNumber,
    admin: req.body.admin
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

passport.use(new passportJwt.Strategy(
  {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
  }, 
  // When we have a verified token
  (payload, done) => {
    // Find user by using id from database
    User.findById(payload.sub)
      .then(user => {
        // If user was found with this id
        if (user) {
          done(null, user)
        }
        // If user was not found
        else {
          done(null, false)
        }
      })
      .catch(error => {
        // if there was a failure
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create signed token
  const token = JWT.sign(
    {
      email: user.email,
      admin: user.admin
    },
      // secret
      jwtSecret,
    // options
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString(),
    }
  )
  // Send the token
  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', {session: false}),
  signJWTForUser
}