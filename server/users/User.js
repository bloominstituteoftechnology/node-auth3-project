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
    maxlength: 40,
    validate: checkPasswordLength,
    msg: 'password not strong enough',
  },
  race: {
    type: String,
    required: true,
    validate: {
      validator: /(hobbit|human|elf)/,
      msg: 'invalid race'
    }
  }
});

function checkPasswordLength(password) {
  return password.length > 12;
}


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
