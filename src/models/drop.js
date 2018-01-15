const User = require('./User')

User.deleteMany() 
  .then(() => {
    console.log('Deleted Users')
    process.exit()
  })