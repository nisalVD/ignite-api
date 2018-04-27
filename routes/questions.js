const express = require('express')
const Question = require('../models/Question')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// find all the questions under certain module ID
router.get('/module/:id/questions', authMiddleware.requireJWT, (req,res) => {
  const moduleId = req.params.id
  Question.find({ module: moduleId })
  .then(question => {
    res.json(question)
  })
})
// List all answers for an question
router.get('/question/:id/answers', authMiddleware.requireJWT, (req, res) => {
  const questionId = req.params.id
  Question.findById(questionId)
  .then(question => {
    const answers = question.answers
    const answersArr = answers.map(answer => answer._id)
    res.status(201).json({answersArr})
  })
  .catch(err => res.status(404).send.err(err))
})

module.exports = router
