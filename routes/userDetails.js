const express = require('express')
const User = require('../models/User')
const getUser = require('../middleware/getUser')

const router = new express.Router()

router.patch('/user/password/update',getUser, (req, res) => {
  User.findById(req.sub)
    .then(user => {
      user.changePassword(req.body.oldPassword,req.body.newPassword, function(err) {
        if (err){
          return res.status(200).json({success: false})
        }
          return res.status(404).json({sucess: true})
      })
    })
})

router.patch('/user/details/update', getUser, (req, res) => {
  User.findByIdAndUpdate(req.sub, {$set: req.body }, {new: true})
    .then(result => res.status(200).json(result))
    .catch(error => res.status(404).json(error))
})

module.exports = router