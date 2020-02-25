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
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  },
  colors: [
    {
      type: String,
      required: true
    }
  ],
  donations: [
    {
      type: ObjectId,
      ref: "Donation"
    }
  ]
});

if (process.env.IS_OFFLINE) {
  delete mongoose.connection.models.Nonprofit;
}

module.exports = mongoose.model("Nonprofit", nonprofitSchema);
