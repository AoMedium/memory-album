import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {
    globals: {
      height: number;
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    globals?: {
      height?: number;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
