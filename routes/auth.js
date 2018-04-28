const express = require('express')
const authMiddleWare = require('../middleware/auth')
const User = require('../models/User')
const getUser = require('../middleware/getUser')

const router = new express.Router()

// Register
router.post('/auth/register',
  authMiddleWare.register,
  authMiddleWare.signJWTForUser
)
// Sign in
router.post('/auth',
  authMiddleWare.signIn,
  authMiddleWare.signJWTForUser
)

//verify user
router.post('/verify-token', (req, res) => {
  const id = req.body.id
  const token = req.body.token
  User.findById(id)
    .then(user => {
      if (user.verified === true) {
        return Promise.reject('User already verified')
      }
      if (user.verified === false) {
        if(user.verifyToken === token) {
          User.findByIdAndUpdate(id, {verified: true}, {new: true})
            .then((updatedUser) => {
              console.log(updatedUser)
              req.user = updatedUser
              console.log(updatedUser)
              authMiddleWare.signJWTForUser(req,res)
              return
            })
          } else {
            return Promise.reject('incorrect Token')
          }
      }
    })
    .catch(error => {
      if (error.message) {
        res.json({message: 'could not find that user'})
      } else {
        res.json({message: error}).status(404)
      }
    })
})

module.exports = router
