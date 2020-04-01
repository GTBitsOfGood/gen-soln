const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  org: {
    type: ObjectId,
    ref: "Nonprofit",
    required: true
  }
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
