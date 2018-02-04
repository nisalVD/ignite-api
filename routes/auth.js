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

// update User
router.patch('/auth/update', authMiddleWare.requireJWT, getUser, (req, res) => {
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
