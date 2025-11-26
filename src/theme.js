import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#ff5722" },
      secondary: { main: "#ffa726" },
      background: {
        default: mode === "light" ? "#fafafa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily:
        "Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },
  });
