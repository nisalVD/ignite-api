const mongoose = require('./init')
const Schema = mongoose.Schema

const MarkingSchema = new Schema({
  correct: Boolean,
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  module: {
    type: Schema.ObjectId,
    ref: 'Module',
    required: true
  },
  question: {
    type: Schema.ObjectId,
    ref: 'Question',
    required: true,
  }, 
  answer: {
    type: Schema.ObjectId,
    ref: 'Question.answer',
    required: true
  }
})

module.exports = mongoose.model('Marking', MarkingSchema)