import { useSnackbar } from 'notistack';

export const useErrorNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notifyErrorMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  return {
    notifyErrorMessage,
  };
};
