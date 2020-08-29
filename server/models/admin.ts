import { Schema, model, models, Model } from "mongoose";
import { IAdmin } from "server/types/models";

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

const adminModel: Model<IAdmin> = models?.Admin || model("Admin", adminSchema);

export default adminModel;
