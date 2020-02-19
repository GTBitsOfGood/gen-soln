const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const donationSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    required: false,
    default: "N/A"
  }
});

module.exports = mongoose.model("Donation", donationSchema);
