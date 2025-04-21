import { SnackbarKey, useSnackbar } from 'notistack';

const autoHideDuration = 2000;

export default function useNotification(): {
  notify: (message: string) => SnackbarKey;
  inform: (message: string) => SnackbarKey;
  reportSuccess: (message: string) => SnackbarKey;
  warn: (message: string) => SnackbarKey;
  throwError: (message: string) => SnackbarKey;
} {
  const { enqueueSnackbar } = useSnackbar();
  // TODO: customisation https://notistack.com/features/customization

  const notify = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration,
      variant: 'default',
    });

  const inform = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration,
      variant: 'info',
    });

  const reportSuccess = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration,
      variant: 'success',
    });

  const warn = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration,
      variant: 'warning',
    });

  const throwError = (message: string) =>
    enqueueSnackbar(message, {
      autoHideDuration,
      variant: 'error',
    });

  return { notify, inform, reportSuccess, warn, throwError };
}
