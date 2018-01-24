const express = require('express')
const Module = require('../models/Module')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')
const requireAdmin = require('../middleware/admin')

const router = new express.Router()
// Find All user data
router.get('/users', requireAdmin,  (req,res) => {
  User.find()
    .then(user => res.status(202).json(user))
    .catch(error => res.status(404).json({error: error.message}))
})

// Add new module
router.post('/module', requireAdmin, (req,res) => {
  Module.create(req.body)
    .then(newModule => res.status(201).json(newModule))
    .catch(err => res.send(err))
})

// Delete Module by ID
router.delete('/module/:id', requireAdmin, (req, res) => {
  const {id} = req.params
  Module.findByIdAndRemove(id)
    .then(module => {
      if(module){
        res.status(202).json(module)
      }
      else {
        res.status(404).json(`module with ${id} not found`)
      }
    })
    .catch(error => {
      res.status(404).json({error: error.message})
    })
})

// List all questions
router.get('/questions', requireAdmin, (req, res) => {
  Question.find()
  .then(question => res.status(202).json(question))
  .catch(err => res.status(404).send(err))
})

// Add a new question
router.post('/question', requireAdmin, (req,res) => {
  Question.create(req.body)
    .then(question => res.status(201).json(question))
    .catch(err => res.send(err))
})

// List all the answers
router.get('/answers', requireAdmin, (req, res) => {
  Answer.find()
  .then(answer => res.status(202).json(answer))
  .catch(err => res.status(404).send(err))
})

// Add new answers
router.post('/answer', requireAdmin, (req,res) => {
  Answer.create(req.body)
    .then(answer => res.status(201).json(answer))
    .catch(err => res.send(err))
})

// delete a question by id
router.delete('/question/:id', requireAdmin, (req,res) => {
  const {id} = req.params
  Question.findByIdAndRemove(id)
    .then(question => {
      if(question){
        res.status(202).json(question)
      }
      else {
        res.status(404).json(`question with ${id} not found`)
      }
    })
    .catch(error => {
      res.status(404).json({error: error.message})
    })
})

// delete answer by question id
router.delete('/question/:id/answer', requireAdmin, (req ,res) => {
  const {id} = req.params
  Answer.remove({question: id})
  .then(question => {
    if(question){
      res.status(202).json(question)
    }
    else {
      res.status(404).json(`question with ${id} not found`)
    }
  })
  .catch(error => {
    res.status(404).json({error: error.message})
  })
})

module.exports = router