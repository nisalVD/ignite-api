const mongoose = require('./init')
const Schema = mongoose.Schema

const MarkingSchema = new Schema({
  correct: Boolean,
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: Schema.ObjectId,
    ref: 'Question',
    required: true
  }
})

module.exports = mongoose.model('Marking', MarkingSchema)