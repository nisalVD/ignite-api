const User = require('./User')
const Module = require('./Module')
const Question = require('./Question')
const Marking = require('./Marking')
const Answer = require('./Answer')

User.find()
  .then(user => console.log("user", user))

Module.find()
  .then(module => console.log("Modules", module))

Question.find()
  .then(question => console.log("question", question))

Marking.find()
  .then(marking => console.log("Marking", marking))

Answer.find()
  .then(answer => console.log("answer", answer))