declare module '@mui/material/styles' {
  interface Palette {
    icon: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    icon?: {
      main?: string;
    };
  }
}
