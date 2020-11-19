const { Schema, model } = require('mongoose');

const plantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sample: {
    type: String,
    required: true
  },
  habitat: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('Plant', plantSchema);

