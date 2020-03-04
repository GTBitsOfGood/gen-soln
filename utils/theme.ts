import { createMuiTheme } from "@material-ui/core/styles";

import { Spacing } from "./types";

const margins: Record<Spacing, string> = {
  VERTICAL: "5vh",
  LEFT: "8vw"
};

export default createMuiTheme({
  palette: {
    primary: {
      main: "#403C70"
    },
    secondary: {
      main: "rgba(64, 59, 112, 0.38)"
    },
    background: {
      default: "#F7F7F9",
      imagePlaceholder: "#EBDEF0"
    },
    nonProfitColors: {
      primary: "#95C079",
      secondary: "#013042"
    }
  },
  nonProfitImages: {
    logo: "url(nonProfitLogo.png)",
    background: "url(nonProfitBackgroundImage.png)"
  },
  margins
});
