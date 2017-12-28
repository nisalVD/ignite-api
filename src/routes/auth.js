const express = require('express')
const authMiddleWare = require('../middleware/auth')

const router = new express.Router()

// Register
router.post('/auth/register', 
  authMiddleWare.register,
  (req ,res) => {
    res.json({
      user: req.user
    })
  }
)

// Sign in
router.post('/auth',
  authMiddleWare.signIn,
  (req ,res) => {
    res.json({
      user: req.user
    })
  }
)

module.exports = router
