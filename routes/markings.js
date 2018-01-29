const express = require('express')
const Marking = require('../models/Marking')
const Answer = require('../models/Answer')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Marking where multiple question/answers are passed
router.post('/marking', authMiddleware.requireJWT, (req,res) => {
  let isComplete = false 
  const {quiz,user} = req.body
  const userModule = req.body.module
  Marking.find({user : user, module: userModule})
    .then(foundMarkings => {
      function isEveryTrue(element){
        return element.correct === true
      }
      if(foundMarkings.length > 0) {
        isComplete = foundMarkings.every(isEveryTrue)
      } else {
        isComplete = false
      }
      return isComplete
    })
    .then(() => {
        // If only there is atleast 1 false question run this
      if (isComplete === false) {
        // Find all keys for quiz
        const userQuestionArray = []
        for (var key in quiz) {
          if (quiz.hasOwnProperty(key)) {
            userQuestionArray.push(key)
          }
        }
        Answer.find({question: {$in: userQuestionArray}})
          .then(foundAnswer=> {
            const parsedAnswerArray = foundAnswer.map(correctData => {
              const correctAnswer = correctData.answer
              const correctQuestion = correctData.question
              let correct = false
              if(quiz[correctQuestion] == correctAnswer){
                correct = true
              }
              const parsedAnswer = {
                user: user,
                module: userModule,
                question: correctQuestion,
                answer: correctAnswer,
                correct: correct
              }
              // parsedAnswer.user = user
              // parsedAnswer.module = userModule
              // parsedAnswer.question = correctQuestion
              // parsedAnswer.answer = correctAnswer
              // parsedAnswer.correct = false
              // if(quiz[correctQuestion] == correctAnswer){
              //   parsedAnswer.correct = true
              // }
              return parsedAnswer
            })
            return parsedAnswerArray
          })
          .then(parsedAnswerArray => {
            let markingQueries = []
            parsedAnswerArray.forEach(answer => {
              markingQueries.push(
                Marking.update(
                  {user: answer.user, question: answer.question, module: answer.module},
                  { answer: answer.answer, correct: answer.correct},
                  { upsert: true }
                )
              )
            })
            return Promise.all(markingQueries)
          })
          .then(listOfMarkings => {
            res.status(202).json(listOfMarkings)
          })
          .catch(error => {
            res.status(500).json({error: error.message})
          })
      }
  })
  .catch(error => res.status(500).json({error: error.message}))
})

// Find marking for Each user
router.get('/user/:id/markings', authMiddleware.requireJWT, (req,res) => {
  const {id} = req.params
  Marking.find({user: id})
    .then(foundUser => {
      if (foundUser){
        res.status(202).json(foundUser)
      } else {
        res.status(404).json({
          error: new Error(`user with ${id} not found`)
        })
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message }) })
})

// incorrect Answers
router.get('/user/:id/module/:modid/markings/incorrect', authMiddleware.requireJWT, (req,res) => {
  const {id} = req.params
  const {modid} = req.params
  Marking.find({user: id, correct: false, module: modid})
    .populate('question')
    .then(foundUser => {
      if (foundUser){
        res.status(202).json(foundUser)
      } else {
        res.status(404).json({
          error: new Error(`user with ${id} not found`)
        })
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message }) })
})

module.exports = router