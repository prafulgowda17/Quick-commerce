import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, useTheme as useMuiTheme } from "@mui/material/styles";
import { getTheme } from "../theme";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);
export const useTheme = () => useMuiTheme();

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
