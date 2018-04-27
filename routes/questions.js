const express = require('express')
const User = require('../models/User.js')
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

//verify user
router.get('/verify/:id/:token', (req, res) => {
  const id = req.params.id
  const token = req.params.token
  User.findById(id)
    .then(user => {
      console.log(user)
      if (user.verified === false) {
        if(user.verifyToken === token) {
          user.update({verified: true})
            .then(user => {
              res.json({message: "user sucessfully verified"}).status(202)
            })
        } else {
          return Promise.reject('incorrect Token')
        }
        } else {
          return Promise.reject('user already verified')
        }
    })
    .catch(error => {
      res.json({message: error}).status(404)
    })
})

module.exports = router
