const passport = require('passport')
const JWT = require('jsonwebtoken')
const passportJwt = require('passport-jwt')
const User = require('../models/User')

// mailgun to send verification email

const SITE_URL = 'http://localhost:3000'

const api_key = process.env.MAILGUN_KEY
const domain = 'sandbox7a44e8b99eae406fa91ee0ecd9054406.mailgun.org'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const jwtSecret = process.env.JWT_SECRET
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
    admin: req.body.admin,
    verified: req.body.verified
  })
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error)
      return
    }
    // send verification email to user

      const data = {
        from: 'nisal <nisalvd@gmail.com>',
        to: `${user.email}`,
        subject: 'verification',
        text: `Click this to verify email \n ${SITE_URL}/verify-account/${user._id}/${user.verifyToken}`
      };
    console.log(data)
      mailgun.messages().send(data, (error, body) => {
        if (error) {
          console.log(error)
        } else {
          console.log(body)
        }
      })


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
        if (user && user.verified === true || user.admin === true) {
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
      admin: user.admin,
      verified: user.verified
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
