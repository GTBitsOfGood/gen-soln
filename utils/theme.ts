import { createMuiTheme } from "@material-ui/core/styles";

import { Spacing } from "./types";

const margins: Record<Spacing, string> = {
  VERTICAL: "5vh",
  VERTICAL1: "8vh",
  LEFT: "8vw",
  RIGHT: "8vw"
};

export default createMuiTheme({
  palette: {
    primary: {
      main: "#403C70"
    },
    secondary: {
      main: "#A09DB7"
    },
    background: {
      default: "#F7F7F9",
      imagePlaceholder: "#EBDEF0"
    }
  },
  margins
});
