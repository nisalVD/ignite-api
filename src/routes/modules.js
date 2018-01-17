const express = require('express')
const Module = require('../models/Module')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const Marking = require('../models/Marking')

const router = new express.Router()

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
router.post('/Marking', (req,res) => {
  Marking.create(req.body)
    .then(marking => res.status(201).json(marking))
    .catch(err => res.send(err))
})

module.exports = router