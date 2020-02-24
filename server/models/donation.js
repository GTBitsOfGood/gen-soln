const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const { Nonprofit } = require('./nonprofit');

const donationSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  donor: {
    type: String,
    required: true
  },
  org: {
    type: ObjectId,
    ref: 'Nonprofit',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);
