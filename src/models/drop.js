const User = require('./User')
const Module = require('./Module')

User.deleteMany() 
  .then(() => {
    console.log('Deleted Users')
  })

Module.deleteMany()
  .then(() => {
    console.log('Deleted Modules')
  })