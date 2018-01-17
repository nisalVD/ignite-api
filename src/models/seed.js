const User = require('./User')

User.find()
  .then(user => console.log("user", user))