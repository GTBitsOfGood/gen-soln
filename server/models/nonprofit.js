const mongoose = require("mongoose");
const customAlphabet = require("nanoid").customAlphabet;
const Schema = mongoose.Schema;

const ALPHABET = "0123456789";
const ID_LENGTH = 8;
const nanoid = customAlphabet(ALPHABET, ID_LENGTH);
const CAUSES = [
  { text: "arts", value: "ARTS" },
  { text: "Culture and Humanities", value: "CULTURE AND HUMANITIES" },
  { text: "Education and Research", value: "EDUCATION AND RESEARCH" },
  { text: "Environment and Animals", value: "ENVIRMONMENT AND ANIMALS" },
  { text: "Health", value: "HEALTH" },
  { text: "Human Services", value: "HUMAN SERVICES" },
  { text: "International", value: "INTERNATIONAL" },
  { text: "Public, Societal", value: "PUBLIC, SOCIETAL" },
  { text: "Religion", value: "RELIGION" },
  { text: "Other", value: "OTHER" }
];

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
  primaryColor: {
    type: String,
    required: true
  },
  secondaryColor: {
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
    enum: [
      "ARTS, CULTURE, AND HUMANITIES",
      "EDUCATION AND RESEARCH",
      "ENVIRONMENT AND ANIMALS",
      "HEALTH",
      "HUMAN SERVICES",
      "INTERNATIONAL",
      "PUBLIC, SOCIETAL",
      "RELIGION",
      "OTHER"
    ],
    default: "OTHER",
    required: true
  }
});

module.exports =
  mongoose.models?.Nonprofit || mongoose.model("Nonprofit", nonprofitSchema);
module.exports.CAUSES = CAUSES;
