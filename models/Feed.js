const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedSchema = new Schema({
  heading : {
    type: String,
    required: true
  },
  content : {
    type: String,
    required: true
  },
  timePosted: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Feed', FeedSchema)