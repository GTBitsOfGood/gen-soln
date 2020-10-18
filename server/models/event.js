const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// eslint-disable-next-line no-unused-vars
const pointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  { _id: false }
);

const DEFAULT_IMAGE = "/defaultImages/defaultEvent.png";
// Keep in sync with utils/types Event
const eventSchema = new Schema(
  {
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
      default: Date.now,
      get: d => d.toString() // getter added to avoid Next.js serialization errors in development
    },
    endDate: {
      type: Date,
      default: Date.now,
      get: d => d.toString()
    },
    about: {
      type: String,
      default: ""
    },
    address: {
      text: {
        main: {
          type: String,
          required: true
        },
        secondary: {
          type: String,
          required: true
        }
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
          ref: "User"
        }
      ],
      default: []
    },
    image: {
      type: String,
      default: DEFAULT_IMAGE
    }
  },
  { toObject: { getters: true }, toJSON: { getters: true } }
);

/**
 * @return the duration of the event in ms
 */
eventSchema.virtual("duration").get(function () {
  return new Date(this.endDate) - new Date(this.startDate);
});

module.exports = mongoose.models?.Event || mongoose.model("Event", eventSchema);
module.exports.DEFAULT_IMAGE = DEFAULT_IMAGE;
