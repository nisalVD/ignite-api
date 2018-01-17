const User = require('./User')
const Module = require('./Module')
const Answer = require('./Answer')
const Question = require('./Question')
const Marking = require('./Marking')

User.find()
  .then(user => console.log("user", user))

Module.find()
  .then(module => console.log("Modules", module))

Answer.find()
  .then(answer => console.log("Answer", answer))

Question.find()
  .then(question => console.log("question", question))

Marking.find()
  .then(marking => console.log("Marking", marking))