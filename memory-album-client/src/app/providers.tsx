import { store } from '@/state/store';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={8}>{children}</SnackbarProvider>
    </Provider>
  );
}
