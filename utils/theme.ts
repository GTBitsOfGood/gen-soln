import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { orange } from "@core/colors/primary";
import grays from "@core/colors/grays";
import { typographyStyles } from "@core/typography";

import { Spacing } from "./types";

// TODO: Remove eventually after we migrate to new layout components
const margins: Record<Spacing, string> = {
  VERTICAL: "4.5vh",
  HORIZONTAL: "8.5vw",
  LARGE_VERTICAL: "7vh"
};

const theme = createMuiTheme({
  palette: {
    primary: { ...orange, contrastText: grays.white },
    secondary: {
      main: "rgba(64, 59, 112, 0.38)" // TODO: remove this when DMS no longer relies on a secondary color
    },
    text: {
      primary: grays["80"],
      secondary: grays["60"],
      disabled: grays["40"],
      hint: grays["40"]
    },
    background: { default: grays.bg, paper: grays.white }
  },
  typography: typographyStyles,
  props: {
    MuiButton: {
      color: "primary"
    },
    MuiCheckbox: {
      color: "primary"
    },
    MuiTextField: {
      size: "small",
      color: "primary"
    }
  },
  overrides: {
    MuiInputAdornment: {
      positionStart: {
        marginRight: 0
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 100
      }
    }
  },
  margins
});

export default theme;
