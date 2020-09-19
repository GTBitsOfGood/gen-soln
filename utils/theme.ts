import { createMuiTheme, Theme } from "@material-ui/core/styles";

import { Spacing, Nonprofit } from "./types";
//import "./fonts.css";

const margins: Record<Spacing, string> = {
  VERTICAL: "4.5vh",
  HORIZONTAL: "8.5vw",
  LARGE_VERTICAL: "7vh"
};

// Created a special variable for primary color since it is imported by _document.tsx
export const MAIN = "#403C70";

const createNonprofitMuiTheme = (nonprofit: Nonprofit | undefined): Theme =>
  createMuiTheme({
    palette: {
      primary: {
        main: MAIN
      },
      secondary: {
        main: "rgba(64, 59, 112, 0.38)"
      },
      background: {
        default: "#F5F5F7"
      },
      nonprofitPrimary: nonprofit?.primaryColor,
      nonprofitSecondary: nonprofit?.secondaryColor
    },
    props: {
      MuiTextField: {
        variant: "filled",
        size: "small",
        color: "secondary"
      }
    },
    overrides: {
      MuiFilledInput: {
        root: {
          backgroundColor: "#F5F5F5"
        }
      },
      MuiFormHelperText: {
        contained: {
          marginLeft: 0,
          marginRight: 0
        }
      }
    },
    typography: {
      h1: {
        fontFamily: "Visby CF",
        fontSize: "36px",
        fontWeight: 800
      },
      h2: {
        fontFamily: "Visby CF",
        fontSize: "24px",
        fontWeight: 800
      },
      h3: {
        fontFamily: "Visby CF",
        fontSize: "20px",
        fontWeight: 800
      },
      overline: {
        fontFamily: "Visby CF",
        fontSize: "14px",
        fontWeight: 800
      },
      body2: {
        fontFamily: "Open Sans",
        fontSize: "18px"
      },
      caption: {
        fontFamily: "Open Sans",
        fontSize: "16px"
      }
    },
    nonprofitBackgroundImage: nonprofit?.background,
    nonprofitLogoImage: nonprofit?.logo,
    margins
  });

export default createNonprofitMuiTheme;
