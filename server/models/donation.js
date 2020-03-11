const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
  org: {
    type: ObjectId,
    ref: "Nonprofit",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

if (process.env.IS_OFFLINE) {
  delete mongoose.connection.models.Donation;
}

module.exports =
  mongoose.models.Donation || mongoose.model("Donation", donationSchema);
