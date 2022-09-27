import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#23ce6b",
      light: "#58DA8E",
    },
    secondary: {
      main: "#EDF5FC",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
