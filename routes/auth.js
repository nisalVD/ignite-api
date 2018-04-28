const express = require('express')
const authMiddleWare = require('../middleware/auth')
const User = require('../models/User')
const getUser = require('../middleware/getUser')
const randomstring = require("randomstring");
// mailgun
const SITE_URL = 'http://localhost:3000'
const api_key = process.env.MAILGUN_KEY
const domain = 'sandbox7a44e8b99eae406fa91ee0ecd9054406.mailgun.org'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

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

// resend verification email

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

router.post('/resend-verify-token', (req,res) => {
  const id = req.body.id
  User.findByIdAndUpdate(id, {verifyToken: randomstring.generate()}, {new: true})
    .then(user => {
      const data = {
        from: 'nisal <nisalvd@gmail.com>',
        to: `${user.email}`,
        subject: 'verification',
        text: `Click this to verify email \n ${SITE_URL}/verify-account/${user._id}/${user.verifyToken}`
      };
    console.log(data)
      mailgun.messages().send(data, (error, body) => {
        if (error) {
          res.json({message: 'something went wrong sending email'}).status(404)
        } else {
          res.json({message: 'email sucessfully sent'}).status(202)
          console.log(body)
        }
      })
    })
    .catch(error => {
      console.log(error)
      res.json({message: 'could not find user'}).status(404)
    })
})

module.exports = router
