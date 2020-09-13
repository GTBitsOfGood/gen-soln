const mongoose = require("mongoose");
const customAlphabet = require("nanoid").customAlphabet;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
  donations: {
    type: [ObjectId],
    ref: "Donation"
  },
  stripeAccount: {
    type: String,
    required: true
  }
});

module.exports =
  mongoose.models?.Nonprofit || mongoose.model("Nonprofit", nonprofitSchema);
