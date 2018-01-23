const express = require('express')
const Module = require('../models/Module')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// list all modules
router.get('/modules', authMiddleware.requireJWT, (req, res) => {
  Module.find()
  .then(module => res.status(202).json(module))
  .catch(err => res.status(404).send(err))
})

module.exports = router