import { useSnackbar } from 'notistack';

export const useSuccessNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notifySuccessMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  return {
    notifySuccessMessage,
  };
};
