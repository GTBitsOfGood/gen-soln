const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  events: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Event"
      }
    ],
    default: []
  }
});

module.exports = mongoose.models?.User || mongoose.model("User", userSchema);
