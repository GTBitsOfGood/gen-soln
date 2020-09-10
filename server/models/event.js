const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nonprofitId: {
    type: Schema.ObjectId,
    ref: "Nonprofit",
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: Date.now
  },
  about: {
    type: String,
    default: ""
  },
  maxVolunteers: {
    type: Number,
    required: true
  },
  volunteers: [
    {
      type: Schema.ObjectId,
      ref: "Admin" //TODO replace with "User" once that schema is created
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