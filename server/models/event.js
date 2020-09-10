const mongoose = require("mongoose");

// eslint-disable-next-line no-unused-vars
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});
