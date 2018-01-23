const User = require('./User')
const Module = require('./Module')
const Question = require('./Question')
const Marking = require('./Marking')
const Answer = require('./Answer')

// User.deleteMany() 
//   .then(() => {
//     console.log('deleted users')
//   })

Module.deleteMany()
  .then(() => {
    console.log('deleted modules')
  })

Question.deleteMany()
  .then(() => {
    console.log('deleted question')
  })

Marking.deleteMany()
  .then(() => {
    console.log('deleted marking')
  })

Answer.deleteMany()
  .then(() => {
    console.log('deleted answers')
  })