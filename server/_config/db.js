const mongoose = require('mongoose');
const { MONGO_URI } = require('../settings');

module.exports = {
  connect: function() {
    return mongoose.connect(MONGO_URI);
  },
};
