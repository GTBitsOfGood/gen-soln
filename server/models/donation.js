const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Keep in sync with utils/types Donation
const donationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
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
  userId: {
    type: String,
    ref: "User"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models?.Donation || mongoose.model("Donation", donationSchema);
