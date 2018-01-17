const express = require('express')
const authMiddleWare = require('../middleware/auth')
const Module = require('../models/Module')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

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

router.post('/module', (req,res) => {
  Module.create(req.body)
    .then(newModule => res.status(201).json(newModule))
    .catch(err => res.send(err))
})
router.post('/question', (req,res) => {
  Question.create(req.body)
    .then(question => res.status(201).json(question))
    .catch(err => res.send(err))
})
router.post('/answer', (req,res) => {
  Answer.create(req.body)
    .then(answer => res.status(201).json(answer))
    .catch(err => res.send(err))
})

module.exports = router
