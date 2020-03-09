import { TypeBackground } from "@material-ui/core/styles/createPalette";
import { ThemeOptions, Theme } from "@material-ui/core/styles/createMuiTheme";

export type Spacing = "VERTICAL" | "VERTICAL1" | "LEFT" | "RIGHT";

declare module "@material-ui/core/styles/createPalette" {
  interface TypeBackground {
    imagePlaceholder: string;
  }
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    margins: Record<Spacing, string>;
  }

  interface ThemeOptions {
    margins: Record<Spacing, string>;
  }
}
