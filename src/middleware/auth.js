const passport = require('passport')
const User = require('../models/User')

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
    //
    req.user = user
    next()
  })
}

module.exports = {
  register,
  signIn: passport.authenticate('local', { session: false })
}