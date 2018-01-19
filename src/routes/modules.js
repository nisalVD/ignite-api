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

router.post('/module', (req,res) => {
  Module.create(req.body)
    .then(newModule => res.status(201).json(newModule))
    .catch(err => res.send(err))
})

// Find all the questions for the module
router.get('/module/:id/questions', (req,res) => {
  const moduleId = req.params.id
  Question.find({ module: moduleId })
  .then(question => {
    res.json(question)
  })
})

// Marking where multiple question/answers are passed
router.post('/marking-test', (req,res) => {
  const {quiz} = req.body
  const userQuestionArray = []
  for (var key in quiz) {
    if (quiz.hasOwnProperty(key)) {
      userQuestionArray.push(key)
    }
  }
  userQuestionArray.forEach(question => {
    Answer.findOne({question: question})
      .then(foundQuestion => {
        let correct = false 
        const userAnswer = quiz[question]
        console.log(userAnswer)
        const correctAnswer = foundQuestion.answer
        console.log(correctAnswer)
        if (userAnswer == correctAnswer){
          correct = true
        }
        console.log(correct)
        let parsedAnswer = {}
        parsedAnswer.user = req.body.user
        parsedAnswer.question = question
        parsedAnswer.answer = userAnswer
        parsedAnswer.correct = correct
        return Marking.create(parsedAnswer)
      })
      .then(marking => res.status(202).json({marking}))
      .catch(err => res.status(404).json({error: err.message}))
  })
})

router.post('/marking', (req,res) => {
  const { question } = req.body
  const answer = req.body.answer
  let correct = false; 
  // console.log('user', user)
  // console.log('question', question)
  // console.log('answer', answer)
  Answer.findOne({ question})
    .then(question => {
      const correctAnswer = question.answer
      if(answer==correctAnswer) {
        correct = true
      }
    })
    .then(() => {
      req.body.correct = correct
      console.log(req.body)
      return Marking.create(req.body)
    })
    .then(marking => res.status(202).json(marking))
    .catch(err => res.status(404).json({error: err.message}))
})

router.get('/user/:id/markings', (req,res) => {
  const {id} = req.params
  Marking.find({user: id})
    .then(marking => {
      res.status(401).json(marking)
    })
})
      
router.get('/markings', (req,res) => {
  Marking.find()
    .then(marking => res.json(marking))
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
    const answersArr = answers.map(answer => answer._id)
    res.status(201).json({answersArr})
  })
  .catch(err => res.status(404).send.err(err))
})



// router.post('/marking', (req,res) => {
//   Marking.create(req.body)
//     .then(marking => res.status(201).json(marking))
//     .catch(err => res.send(err))
// })

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