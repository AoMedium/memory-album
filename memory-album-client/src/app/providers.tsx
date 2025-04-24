import { mainTheme } from '@/config/themes';
import { store } from '@/state/store';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={8}>{children}</SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
