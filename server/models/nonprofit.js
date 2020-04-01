const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const nonprofitSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  donations: {
    type: [ObjectId],
    ref: "Donation"
  }
});

module.exports =
  mongoose.models.Nonprofit || mongoose.model("Nonprofit", nonprofitSchema);
