const User = require('./User')
const Module = require('./Module')
const Question = require('./Question')
const Answer = require('./Answer')
const Marking = require('./Marking')

User.deleteMany() 
  .then(() => {
    console.log('Deleted Users')
  })

Module.deleteMany()
  .then(() => {
    console.log('Deleted Modules')
  })

Question.deleteMany()
  .then(() => {
    console.log('Deleted Question')
  })

Answer.deleteMany()
  .then(() => {
    console.log('Deleted Answer')
  })

Marking.deleteMany()
  .then(() => {
    console.log('Deleted Marking')
  })