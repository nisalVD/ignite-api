const mongoose = require('./init')

const Module = mongoose.model('Module', {
  name: {
    type: String,
    unique: true
  },
  content: {
    type : String
  }
})

module.exports = Module