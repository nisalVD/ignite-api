const mongoose = require('./init')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  content: String,
  module: { 
    type: Schema.ObjectId,
    ref: 'Module',
    required: true
  },
  answers: [{
    content: String,
  }]
})

module.exports = mongoose.model('Question', QuestionSchema)