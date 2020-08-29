import {
  Palette,
  PaletteOptions
} from "@material-ui/core/styles/createPalette";
import { ThemeOptions, Theme } from "@material-ui/core/styles";
import { Document, Schema } from "mongoose";

export type Spacing = "VERTICAL" | "HORIZONTAL" | "LARGE_VERTICAL";

export interface ISignTokenInput {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  nonprofitId: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export type ISignupInput = Admin;

export interface ICheckTokenInput {
  token: string;
}

export interface ITokenPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  nonprofitId: string;
}

export interface IAdminDocument extends Document, Admin {}

export interface INonprofitDocument extends Document, Nonprofit {
  _id: string;
}

export interface IDonationDocument extends Document, Donation {}

export interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nonprofitId: string;
}
// Keep in sync with the backend schema
export interface Nonprofit {
  _id: string;
  name: string;
  headline: string;
  about: string;
  background: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  donations: Schema.Types.ObjectId[];
}

// Keep in sync with the backend schema
export interface Donation {
  name: string;
  email: string;
  amount: number;
  nonprofitId: string;
  timestamp: Date;
}

export interface Dropdown {
  text: string;
  value: string;
}

export interface DropdownProps {
  items: Dropdown[];
  selectedValue: Dropdown["value"];
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    nonprofitPrimary: Nonprofit["primaryColor"];
    nonprofitSecondary: Nonprofit["secondaryColor"];
  }

  interface PaletteOptions {
    nonprofitPrimary?: Nonprofit["primaryColor"];
    nonprofitSecondary?: Nonprofit["secondaryColor"];
  }
}

declare module "@material-ui/core/styles" {
  interface Theme {
    margins: Record<Spacing, string>;
    nonprofitBackgroundImage: Nonprofit["background"];
    nonprofitLogoImage: Nonprofit["logo"];
  }

  interface ThemeOptions {
    margins: Record<Spacing, string>;
    nonprofitBackgroundImage?: Nonprofit["background"];
    nonprofitLogoImage?: Nonprofit["logo"];
  }
}
