const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: 'A phone number should be of at the form A-B, where A consists of 2 or 3 numbers and B consists of numbers.'
    }
  }
});

module.exports = mongoose.model('Person', personSchema);