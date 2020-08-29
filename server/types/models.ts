import { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nonprofitId: string;
}

export interface IDonation extends Document {
  name: string;
  email: string;
  amount: string;
  nonprofitId: string;
  timestamp: Date;
}

export interface INonprofit extends Document {
  name: string;
  headline: string;
  about: string;
  background: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  donations: Schema.Types.ObjectId[];
}
