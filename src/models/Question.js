const mongoose = require('./init')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  content: String,
  module: { 
    type: Schema.ObjectId,
    ref: 'Module',
    required: true
  },
})

module.exports = mongoose.model('Question', QuestionSchema)