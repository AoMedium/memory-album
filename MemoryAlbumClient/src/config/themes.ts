import { createTheme } from "@mui/material";

const mapTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(83, 153, 251)",
      contrastText: "rgb(255,255,255)",
    },

    secondary: {
      main: "rgb(80, 108, 151)",
    },
    text: {
      primary: "rgb(80, 108, 151)",
      secondary: "grey",
    },
    background: {
      default: "rgb(255,255,255)",
      paper: "rgba(255, 255, 255, 0.9)",
    },
  },
  typography: {
    button: {
      color: "grey",
      textTransform: "none",
    },
  },
});

export default mapTheme;
