const mongoose = require("mongoose");
const customAlphabet = require("nanoid").customAlphabet;

const CAUSES = require("utils/filters").filters.cause;

const Schema = mongoose.Schema;

const ALPHABET = "0123456789";
const ID_LENGTH = 8;
const nanoid = customAlphabet(ALPHABET, ID_LENGTH);

// Keep in sync with utils/types Nonprofit
const nonprofitSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid() // we can now use _id as a URL slug!
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    get: d => d.toString() // getter added to avoid Next.js serialization errors in development
  },
  headline: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  stripeAccount: {
    type: String,
    required: true
  },
  donations: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Donation"
      }
    ],
    default: []
  },
  events: {
    type: [
      {
        type: String,
        ref: "Event"
      }
    ],
    default: []
  },
  cause: {
    type: String,
    enum: CAUSES.map(cause => cause.value),
    default: CAUSES[CAUSES.length - 1].value,
    required: true
  }
});

module.exports =
  mongoose.models?.Nonprofit || mongoose.model("Nonprofit", nonprofitSchema);
