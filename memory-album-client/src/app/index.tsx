import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MapLayout from '@/components/layouts/map-layout';
import { ThemeProvider } from '@mui/material';
import mapTheme from '@/config/themes';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={mapTheme}>
        <MapLayout />
      </ThemeProvider>
    </>
  );
};
