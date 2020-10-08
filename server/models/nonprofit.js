const mongoose = require("mongoose");
const customAlphabet = require("nanoid").customAlphabet;
const Schema = mongoose.Schema;

const ALPHABET = "0123456789";
const ID_LENGTH = 8;
const nanoid = customAlphabet(ALPHABET, ID_LENGTH);
const CAUSES = [
  { text: "Arts", value: "ARTS" },
  { text: "Culture and Humanities", value: "CULTURE_AND_HUMANITIES" },
  { text: "Education and Research", value: "EDUCATION_AND_RESEARCH" },
  { text: "Environment and Animals", value: "ENVIRONMENT_AND_ANIMALS" },
  { text: "Health", value: "HEALTH" },
  { text: "Human Services", value: "HUMAN_SERVICES" },
  { text: "International", value: "INTERNATIONAL" },
  { text: "Public, Societal", value: "PUBLIC_SOCIETAL" },
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
module.exports.CAUSES = CAUSES;
