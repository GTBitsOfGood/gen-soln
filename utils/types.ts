import {
  Palette,
  PaletteOptions
} from "@material-ui/core/styles/createPalette";
import { ThemeOptions, Theme } from "@material-ui/core/styles";
import mongoose from "mongoose";

export type Spacing = "VERTICAL" | "HORIZONTAL" | "LARGE_VERTICAL";

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
  // TODO: consider adding the donations field?
}

// Keep in sync with the backend schema
export interface Donation {
  name: string;
  email: string;
  amount: number;
  nonprofitId: string;
  timestamp: Date;
}

// Keep in sync with the backend schema
export interface Event {
  name: string;
  nonprofitId: string;
  startDate: Date;
  endDate: Date;
  about: string;
  maxVolunteers: number;
  volunteers: Array<string>;
  image: string;
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
