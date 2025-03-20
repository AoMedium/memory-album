import { SnackbarKey, useSnackbar } from 'notistack';

export default function useNotification(): {
  notify: (message: string) => SnackbarKey;
  reportSuccess: (message: string) => SnackbarKey;
  warn: (message: string) => SnackbarKey;
  throwError: (message: string) => SnackbarKey;
} {
  const { enqueueSnackbar } = useSnackbar();
  // TODO: customisation https://notistack.com/features/customization

  const notify = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration: 5000,
      variant: 'default',
    });

  const reportSuccess = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration: 5000,
      variant: 'success',
    });

  const warn = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration: 5000,
      variant: 'warning',
    });

  const throwError = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration: 5000,
      variant: 'error',
    });

  return { notify, reportSuccess, warn, throwError };
}
