const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// eslint-disable-next-line no-unused-vars
const pointSchema = new Schema({
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

// Keep in sync with utils/types Event
const eventSchema = new Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString()
  },
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
  address: {
    text: {
      type: String,
      required: true
    },
    location: {
      type: pointSchema,
      index: "2dsphere",
      required: true
    }
  },
  maxVolunteers: {
    type: Number,
    required: true
  },
  volunteers: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Admin" //TODO replace with "User" once that schema is created
      }
    ],
    default: []
  },
  image: {
    type: String,
    default: 'url("/defaultImages/defaultEvent.png")'
  }
});

/**
 * @return the duration of the event in ms
 */
eventSchema.virtual("duration").get(function () {
  return this.endDate - this.startDate;
});

module.exports = mongoose.models?.Event || mongoose.model("Event", eventSchema);
