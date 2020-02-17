import { createMuiTheme } from "@material-ui/core/styles";
import { TypeBackground } from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
  interface TypeBackground {
    placeholder: string;
  }
}

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
      placeholder: "#EBDEF0"
    }
  }
});
