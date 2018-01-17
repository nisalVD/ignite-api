const express = require('express')
const Module = require('../models/Module')
const Question = require('../models/Question')
const Marking = require('../models/Marking')

const router = new express.Router()

router.post('/module', (req,res) => {
  Module.create(req.body)
    .then(newModule => res.status(201).json(newModule))
    .catch(err => res.send(err))
})

// list all modules
router.get('/modules', (req, res) => {
  Module.find()
  .then(module => res.status(202).json(module))
  .catch(err => res.status(404).send(err))
})

// find my module id
// router.get('/module/:id', (req, res) => {
//   const id = req.params.id
//   Module.findById(id)
//   .then(foundModule => {
//     if(foundModule) {
//       res.status(202).json(foundModule)
//     }
//     else {
//       res.status(404).json({error: `Module with ${id} not found`})
//     }
//   })
//   .catch(err => res.status(404).send(err.message))
// })

// Find all the questions for the module
router.get('/module/:id/questions', (req,res) => {
  const moduleId = req.params.id
  Question.find({ module: moduleId })
  .then(question => {
    res.json(question)
  })
})

router.post('/question', (req,res) => {
  Question.create(req.body)
    .then(question => res.status(201).json(question))
    .catch(err => res.send(err))
})

// list all questions
router.get('/questions', (req, res) => {
  Question.find()
  .then(question => res.status(202).json(question))
  .catch(err => res.status(404).send(err))
})

router.post('/Marking', (req,res) => {
  Marking.create(req.body)
    .then(marking => res.status(201).json(marking))
    .catch(err => res.send(err))
})

module.exports = router