const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Volunteer schema
// Keep in sync with utils/types Donation
const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nonprofitId: {
    type: String,
    ref: "Nonprofit",
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  about: {
    type: String
  },
  maxVolunteers: {
    type: Number,
    required: true
  },
  volunteers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Volunteer" //TODO
    }
  ],
  image: {
    type: String
  }
});

/**
 * @return the duration of the event in ms
 */
eventSchema.virtual("duration").get(function () {
  return this.endDate - this.startDate;
});

module.exports = mongoose.models?.Event || mongoose.model("Event", eventSchema);
