const express = require('express')
const Module = require('../models/Module')
const Question = require('../models/Question')
const Marking = require('../models/Marking')
const Answer = require('../models/Answer')
const User = require('../models/User')

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

// Delete Module by ID
router.delete('/module/:id', (req, res) => {
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

// Find all the questions for the module
router.get('/module/:id/questions', (req,res) => {
  const moduleId = req.params.id
  Question.find({ module: moduleId })
  .then(question => {
    res.json(question)
  })
})

// Marking where multiple question/answers are passed
router.post('/marking', (req,res) => {
  const {quiz,user} = req.body
  const userModule = req.body.module
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
        const parsedAnswer = {}
        parsedAnswer.user = user
        parsedAnswer.module = userModule
        parsedAnswer.question = correctQuestion
        parsedAnswer.answer = correctAnswer
        parsedAnswer.correct = false
        if(quiz[correctQuestion] == correctAnswer){
          parsedAnswer.correct = true
        }
        return parsedAnswer
      })
      return parsedAnswerArray
    })
    .then(parsedAnswerArray => {
      const parsedAnswerQuestion = parsedAnswerArray.map(parsedAnswer => parsedAnswer.question)
      console.log('parsed Answer Question', parsedAnswerQuestion)
      const parsedAnswerUser = parsedAnswerArray.map(parsedAnswer => parsedAnswer.user)
      console.log('pared Answer User', parsedAnswerUser)
      let markingQueries = []

      parsedAnswerArray.forEach(answer => {
        markingQueries.push(
          Marking.update(
            {user: answer.user, question: answer.question, module: answer.module},
            { answer: answer.answer, correct: answer.correct},
            { upsert: true }
          )
        )
        // .then(updateAnswer => {
        //   res.status(202).json({updateAnswer})
        //   .catch(error => { 
        //     res.status(404).json({ error: error.message})
        //   })
        // })
      })
      Promise.all()
    })
  })

// Find marking for Each user
router.get('/user/:id/markings', (req,res) => {
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

// Find All Users
router.get('/users', (req,res) => {
  User.find()
    .then(user => res.status(202).json({user}))
    .catch(error => res.status(404).json({error: error.message}))
})

// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
// });


// router.post('/marking', (req,res) => {
//   const { question } = req.body
//   const answer = req.body.answer
//   let correct = false; 
//   // console.log('user', user)
//   // console.log('question', question)
//   // console.log('answer', answer)
//   Answer.findOne({ question})
//     .then(question => {
//       const correctAnswer = question.answer
//       if(answer==correctAnswer) {
//         correct = true
//       }
//     })
//     .then(() => {
//       req.body.correct = correct
//       console.log(req.body)
//       return Marking.create(req.body)
//     })
//     .then(marking => res.status(202).json(marking))
//     .catch(err => res.status(404).json({error: err.message}))
// })

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