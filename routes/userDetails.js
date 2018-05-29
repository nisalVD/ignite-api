const express = require('express')
const User = require('../models/User')
const getUser = require('../middleware/getUser')
const randomstring = require("randomstring");
const SITE_URL = 'http://localhost:3000'

const api_key = process.env.MAILGUN_KEY
const domain = 'sandbox7a44e8b99eae406fa91ee0ecd9054406.mailgun.org'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const URL = 'http://localhost:3000'
// Change to email address to send modules are completed
const ADMIN_EMAIL = 'nisalvd@gmail.com'

const router = new express.Router()

router.post('/user/email/is-valid', (req,res) => {
  const {email} = req.body
  User.find({email: email})
    .then(user => {
      if(user.length > 0) {
        res.json({message: false}).status(202)
      } else {
        res.json({message: true}).status(404)
      }
    })
})

// Send email to change password
router.post('/user/password/request-change-password-email', (req,res) => {

  const { email } = req.body
  console.log(email)
  User.findOneAndUpdate({email: email}, {verifyToken: randomstring.generate()}, {new: true})
   .then(user => {
        const data = {
          from: 'nisal <nisalvd@gmail.com>',
          to: `${user.email}`,
          subject: 'Update Password',
          text: `Click this to verify email \n ${SITE_URL}/user/forget-password/update/${user._id}/${user.verifyToken}`
        }
        mailgun.messages().send(data, (error, body) => {
          if (error) {
            return res.json({success: false}).status(404)
          } else {
            return res.json({success: true}).status(202)
          }
        })
   })
    .catch(err => {
      res.json({success: false}).status(404)
    })
})

// change password via email request
router.patch('/user/password/change-password-email', (req, res) => {

  const { id } = req.body
  const { verifyToken } = req.body
  const { newPassword } = req.body

  User.findById(id)
    .then(user => {
      if (user.verifyToken === verifyToken) {
        user.setPassword(newPassword, () => {
          user.verifyToken = randomstring.generate()
          user.verified = true
          user.save()
          return res.json({message: "password sucessfully changed"}).status(202)
        })
      } else {
        return res.json({message: "invalid link"}).status(404)
      }
    })
    .catch(error => {
      return res.json({message: "invalid link"}).status(404)
    })
})

// change password via profile
router.patch('/user/password/update',getUser, (req, res) => {

  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  User.findById(req.sub)
    .then(user => {
      user.changePassword(oldPassword, newPassword, (err) => {
         if(err) {
          res.status(404).json({error: err.message})
         } else {
          res.status(200).json({success: true})
         }
      })
    })
})

router.get('/user/details/get-details', getUser, (req,res) => {
  User.findById(req.sub)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json(error))
})

router.patch('/user/details/update', getUser, (req, res) => {
  User.findByIdAndUpdate(req.sub, {$set: req.body }, {new: true})
    .then(result => res.status(200).json(result))
    .catch(error => res.status(404).json(error))
})

router.post('/user/check-list-complete', getUser, (req, res) => {
  User.findById(req.sub)
    .then(user => {
      const data = {
        from: `${user.firstName} <${user.email}>`,
        to: `${ADMIN_EMAIL}`,
        subject: 'All Tests Completed',
        text: `User Submission\nFull Name: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\n\n${URL}/admin`
      };

      mailgun.messages().send(data, (error, body) => {
        if (error) {
          res.status(404).json({error})
        } else {
          res.status(200).json({body})
        }

      })
    })

})

module.exports = router
