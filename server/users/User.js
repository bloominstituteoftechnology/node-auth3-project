const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 4, // make this at least 12 in production
    maxlength: 25,
    validate: checkPasswordLength,
    msg: 'Password is too weak',
  },
  race: {
    type: String,
    required: true,
    validate: {
      validator: /(founder|partner|member)/i,
      msg: 'Invalid race',
    },
  },
});

function checkPasswordLength(password) {
  return password.length > 12;
}

userSchema.pre('save', function(next) {
  return bcrypt
    .hash(this.password, 10) // this time we'll use promises instead of a callback
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
s