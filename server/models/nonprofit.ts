import { Schema, model, models, Model } from "mongoose";
import { INonprofit } from "server/types/models";
import nano from "nanoid";

const ALPHABET = "0123456789";
const ID_LENGTH = 8;

const nanoid: () => string = nano.customAlphabet(ALPHABET, ID_LENGTH);

// Keep in sync with utils/types Nonprofit
const nonprofitSchema: Schema = new Schema({
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
    type: [Schema.Types.ObjectId],
    ref: "Donation"
  }
});

const Nonprofit: Model<INonprofit> =
  models?.Nonprofit || model("Nonprofit", nonprofitSchema);

export default Nonprofit;
