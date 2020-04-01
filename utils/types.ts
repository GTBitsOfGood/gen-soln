import {
  Palette,
  PaletteOptions
} from "@material-ui/core/styles/createPalette";
import { ThemeOptions, Theme } from "@material-ui/core/styles/createMuiTheme";

export type Spacing = "VERTICAL" | "HORIZONTAL" | "LARGE_VERTICAL";

// TODO: Possibly keep in sync with the backend schema
export interface NonProfit {
  name: string;
  id: string;
  donationFormHeadline: string;
  donationFormParagraph: string;
  colors: {
    primary: string;
    secondary: string;
  };
  images: {
    logo: string; // URL of logo image (currently stored in public/), eventually fetch from S3
    background: string; // URL of logo image (currently stored in public/), eventually fetch from S3
  };
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    nonProfitColors: NonProfit["colors"];
  }

  interface PaletteOptions {
    nonProfitColors?: NonProfit["colors"];
  }
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    margins: Record<Spacing, string>;
    nonProfitImages: NonProfit["images"];
  }

  interface ThemeOptions {
    margins: Record<Spacing, string>;
    nonProfitImages?: NonProfit["images"];
  }
}
