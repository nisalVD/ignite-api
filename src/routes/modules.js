const express = require('express')
const Module = require('../models/Module')
const Question = require('../models/Question')
const Marking = require('../models/Marking')
const Answer = require('../models/Answer')

const router = new express.Router()



// list all modules
router.get('/modules', (req, res) => {
  Module.find()
  .then(module => res.status(202).json(module))
  .catch(err => res.status(404).send(err))
})

// Find all the questions for the module
router.get('/module/:id/questions', (req,res) => {
  const moduleId = req.params.id
  Question.find({ module: moduleId })
  .then(question => {
    res.json(question)
  })
})

router.get('/user/:id/markings', (req,res) => {
  const userId = req.params.id
})




// extra routes
// Make new module
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

// list all questions
router.get('/questions', (req, res) => {
  Question.find()
  .then(question => res.status(202).json(question))
  .catch(err => res.status(404).send(err))
})

// List all answers for an question
router.get('/question/:id/answers', (req, res) => {
  const questionId = req.params.id
  Question.findById(questionId)
  .then(question => {
    const answers = question.answers
    answersArr = answers.map(answer => answer._id)
    res.status(201).json({answersArr})
  })
  .catch(err => res.status(404).send.err(err))
})



router.post('/marking', (req,res) => {
  Marking.create(req.body)
    .then(marking => res.status(201).json(marking))
    .catch(err => res.send(err))
})

router.post('/answer', (req,res) => {
  Answer.create(req.body)
    .then(answer => res.status(201).json(answer))
    .catch(err => res.send(err))
})
// List all the answers
router.get('/answers', (req, res) => {
  Answer.find()
  .then(answer => res.status(202).json(answer))
  .catch(err => res.status(404).send(err))
})

module.exports = router