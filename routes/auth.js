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

module.exports = router
