import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#019707",
      light: "#fff",
    },
  },
  typography: {
    fontFamily: ["Roboto Condensed"].join(","),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
