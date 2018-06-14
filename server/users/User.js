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
    minlength: 4, // make this at least 12 in production
    maxlength: 25,
    validate: checkPasswordLength,
    msg: 'password is too weak',
  },
  race: {
    type: String,
    required: true,
    index: true,
    minlength: 2,
    validate: {
      validator: /(hobbit|human|elf)/i,
      msg: 'invalid race',
    },
  },
});

userSchema.pre('save', function (next) { // this hashes password before it saves to database
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
// methods
function checkPasswordLength(password) {
  return password.length > 4; // should be set to 12 in production
}

userSchema.methods.validatePassword = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');