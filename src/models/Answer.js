const mongoose = require('./init')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  question: {
    type: Schema.ObjectId,
    ref: 'Question',
    required: true
  },
  answer: {
    type: Schema.ObjectId,
    ref: 'Question.answer',
    required: true
  }
})

module.exports = mongoose.model('Answer', AnswerSchema)