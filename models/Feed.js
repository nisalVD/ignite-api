const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  timePosted: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Feed', FeedSchema)