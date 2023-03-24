const { Schema, model } = require('mongoose');

const carSchema = new Schema({

  license_plate: {
    type: String,
    required: true,
  },

  make: {
    type: String,
    required: true
  },

  model: {
    type: String,
    required: true
  },

  color: {
    type: String,
    required: true
  },

});

const Car = model('car', carSchema);

module.exports = Car;
