const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  race: {
    type: String, 
    required: true,
    index: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    minlength: 12
  }
});

userSchema.pre('save', function (next) {
  return bcrypt
    .hash(this.password, 11)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => {
      return next(err);
    });
});

userSchema.methods.validatePassword = function (passAttempt) {
  return bcrypt.compare(passAttempt, this.password);
};

module.exports = mongoose.model('User', userSchema);