import { Document } from "mongoose";

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
