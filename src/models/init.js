const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(
  'mongodb://localhost/express-passport-jwt',
  { useMongoClient: true }
)
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB database', error)
  })

module.exports = mongoose