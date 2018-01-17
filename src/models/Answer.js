const mongoose = require('./init')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  content: String,
  correct: Boolean,
  question: {
    type: Schema.ObjectId,
    ref: 'Question',
    required: true
  },
})

module.exports = mongoose.model('Answer', AnswerSchema)