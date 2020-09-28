import { createMuiTheme, Theme } from "@material-ui/core/styles";

import { orange } from "@core/colors/primary";
import grays from "@core/colors/grays";
import { typographyStyles } from "@core/typography";

import { Spacing, Nonprofit } from "./types";

const margins: Record<Spacing, string> = {
  VERTICAL: "4.5vh",
  HORIZONTAL: "8.5vw",
  LARGE_VERTICAL: "7vh"
};

const createNonprofitMuiTheme = (nonprofit: Nonprofit | undefined): Theme =>
  createMuiTheme({
    palette: {
      primary: { ...orange, contrastText: grays.white },
      secondary: {
        main: "rgba(64, 59, 112, 0.38)"
      },
      text: {
        primary: grays["80"],
        secondary: grays["60"],
        disabled: grays["40"],
        hint: grays["40"]
      },
      background: { default: grays.bg },
      nonprofitPrimary: nonprofit?.primaryColor,
      nonprofitSecondary: nonprofit?.secondaryColor
    },
    typography: typographyStyles,
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
    nonprofitBackgroundImage: nonprofit?.background,
    nonprofitLogoImage: nonprofit?.logo,
    margins
  });

export default createNonprofitMuiTheme;
