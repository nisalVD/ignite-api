const express = require('express')
const User = require('../models/User')
const getUser = require('../middleware/getUser')

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


module.exports = router
