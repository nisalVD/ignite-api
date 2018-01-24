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

router.get('/module/:id' , authMiddleware.requireJWT, (req,res) => {
  Module.findById(req.params.id)
  .then(foundModule => {
    if (foundModule){
      res.status(202).json(foundModule)
    } else {
      res.status(404).json({
        error: new Error(`user with ${id} not found`)
      })
    }
  })
  .catch((error) => {
    res.status(400).json({ error: error.message }) 
  })
})

module.exports = router