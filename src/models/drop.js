const User = require('./User')
const Module = require('./Module')
const Question = require('./Question')
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

Marking.deleteMany()
  .then(() => {
    console.log('Deleted Marking')
  })