const express = require('express')
const User = require('../models/User')
const getUser = require('../middleware/getUser')

const router = new express.Router()

router.patch('/auth/update',getUser, (req, res) => {
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

module.exports = router