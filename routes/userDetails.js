const express = require('express')
const User = require('../models/User')
const getUser = require('../middleware/getUser')

const api_key = process.env.MAILGUN_KEY
const domain = 'sandbox7a44e8b99eae406fa91ee0ecd9054406.mailgun.org'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const router = new express.Router()

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


router.patch('/user/details/update', getUser, (req, res) => {
  User.findByIdAndUpdate(req.sub, {$set: req.body }, {new: true})
    .then(result => res.status(200).json(result))
    .catch(error => res.status(404).json(error))
})

router.post('/user/check-list-complete', getUser, (req, res) => {
  const data = {
    from: 'Excited User <nisalvd@gmail.com>',
    to: 'nisalvd@gmail.com',
    subject: 'All Tests Completed',
    text: `All tests have been completed by user with the email ${req.decoded.email}`
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) {
      res.status(404).json({error})
    } else {
      res.status(200).json({body})
    }

  })

})

module.exports = router
