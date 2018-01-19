const User = require('./User')
const Module = require('./Module')
const Question = require('./Question')
const Marking = require('./Marking')
const Answer = require('./Answer')

User.deleteMany() 
  .then(() => {
    console.log('deleted users')
  })

Module.deletemany()
  .then(() => {
    console.log('deleted modules')
  })

Question.deletemany()
  .then(() => {
    console.log('deleted question')
  })

Marking.deletemany()
  .then(() => {
    console.log('deleted marking')
  })

Answer.deletemany()
  .then(() => {
    console.log('deleted answers')
  })