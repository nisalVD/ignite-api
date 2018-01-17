const User = require('./User')
const Module = require('./Module')
const Answer = require('./Answer')

User.find()
  .then(user => console.log("user", user))

Module.find()
  .then(module => console.log("Modules", module))

Answer.find()
  .then(answer => console.log("Answer", answer))