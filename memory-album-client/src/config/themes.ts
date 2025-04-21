import { createTheme } from '@mui/material';

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(83, 153, 251)',
      contrastText: 'rgb(255,255,255)',
    },

    secondary: {
      main: 'rgb(80, 108, 151)',
    },
    text: {
      primary: 'rgb(80, 108, 151)',
      secondary: 'grey',
    },
    background: {
      default: 'rgb(255,255,255)',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
  },
});

export const mainTheme = createTheme(paletteTheme, {
  typography: {
    button: {
      color: 'grey',
      textTransform: 'none',
    },
    h1: {
      fontSize: 32,
      fontWeight: 800,
      color: paletteTheme.palette.text.primary,
    },
    h2: {
      fontSize: 24,
      fontWeight: 600,
      color: paletteTheme.palette.text.primary,
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
      color: paletteTheme.palette.text.primary,
    },
    h4: {
      fontSize: 16,
      fontWeight: 400,
      color: paletteTheme.palette.text.primary,
    },
    body1: {
      fontSize: 14,
      color: paletteTheme.palette.text.primary,
    },
    body2: {
      fontSize: 14,
      color: 'grey',
    },
  },
});
