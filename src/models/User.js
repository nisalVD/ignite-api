/*@flow*/
const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({ 
  firstName: {
    type: String,
    required: 'First Name cannot be blank'
    },
  lastName: {
    type: String,
    required: 'Last Name cannot be blank'
    },
  dateOfBirth: {
    type: Date,
    required: 'Last Name cannot be blank'
  },
  address: {
    type: String,
    required: "Address is required"
   },
  postCode: {
    type: String,
    required: "Post Code is required"
   },
  state: {
    type: String,
    required: "State cannot be blank"
   },
   mobileNumber: {
     type: String,
     required: "Mobile Number is required"
   },
   modulesCompleted: [{
    type: Schema.ObjectId,
    ref: 'Module',
  }],
   isAdmin: {
    type: Boolean,
    default: false
  }
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', // this is the value to sign in with
  usernameLowerField: true, //  ensure that all emails are lowercase 
  session: false // Disable sessions as we'll use JWT (JSON web Tokens)
})

const User = mongoose.model('User', userSchema)
module.exports = User