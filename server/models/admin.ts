import { Schema, model, models, Model } from "mongoose";
import { IAdminDocument } from "utils/types";

const adminSchema: Schema = new Schema({
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
  nonprofitId: {
    type: String,
    ref: "Nonprofit",
    required: true
  }
});

const adminModel: Model<IAdminDocument> =
  models?.Admin || model("Admin", adminSchema);

export default adminModel;
