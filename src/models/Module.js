const mongoose = require('./init')

const Module = mongoose.model('Module', {
  name: {
    type: String,
    unique: true
  }
})

module.exports = Module