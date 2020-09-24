import {
  Palette,
  PaletteOptions
} from "@material-ui/core/styles/createPalette";
import { ThemeOptions, Theme } from "@material-ui/core/styles";

export type Spacing = "VERTICAL" | "HORIZONTAL" | "LARGE_VERTICAL";

// Fields from the back-end Nonprofit schema that should be exposed to the front-end.
// DON'T add confidential fields since those shouldn't be queried by server actions.
export interface Nonprofit {
  _id: string;
  name: string;
  headline: string;
  about: string;
  background: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  stripeAccount: string;
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
interface EventBase {
  name: string;
  startDate: string;
  endDate: string;
  image: string;
  address: { text: string; location: { type: "Point"; coordinates: number[] } };
}

export type Event = EventBase & {
  about: string;
  maxVolunteers: number;
  volunteers: Array<string>;
  nonprofitId: string;
};

export type EventCardData = EventBase & {
  nonprofitID: Pick<Nonprofit, "_id" | "name">;
};

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
