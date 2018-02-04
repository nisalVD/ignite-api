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
   admin: {
    type: Boolean,
    default: false
  }
})


userSchema.methods.changePassword = function(oldPassword, newPassword, cb) {
  if (!oldPassword || !newPassword) {
    return cb(new errors.MissingPasswordError(options.errorMessages.MissingPasswordError));
  }

  var self = this;

  this.authenticate(oldPassword, function(err, authenticated) {
    if (err) { return cb(err); }

    if (!authenticated) {
      return cb(new errors.IncorrectPasswordError(options.errorMessages.IncorrectPasswordError));
    }

    self.setPassword(newPassword, function(setPasswordErr, user) {
      if (setPasswordErr) { return cb(setPasswordErr); }

      self.save(function(saveErr) {
        if (saveErr) { return cb(saveErr); }

        cb(null, user);
      })
    })
  })
}

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', // this is the value to sign in with
  usernameLowerField: true, //  ensure that all emails are lowercase 
  session: false // Disable sessions as we'll use JWT (JSON web Tokens)
})

const User = mongoose.model('User', userSchema)
module.exports = User