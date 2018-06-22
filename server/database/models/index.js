const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 8,
  },
  password: {
    type: String,
    required: true,
    minlength: 17, // make this at least 12 in production
  },
  pin: {
    type: Number,
    required: true,
    minlength: 6,
  },
  // race: {
  //   type: String,
  //   required: true,
  //   index: true,
  //   minlength: 2,
  // },
});

userSchema.pre('save', function(next) {
  return bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;

      return next();
    })
    .catch(err => {
      return next(err);
    });
});

userSchema.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
