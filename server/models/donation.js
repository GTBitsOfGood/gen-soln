const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  nonprofitId: {
    type: String,
    ref: "Nonprofit",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models?.Donation || mongoose.model("Donation", donationSchema);
