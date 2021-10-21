import { useSnackbar } from 'notistack';

/**
 * ユーザーにSUCCESSを知らせるためのSnackbarを表示させるhooks
 * @returns notifySuccessMessage SUCCESSのSnackbarを出す関数
 */
export const useSuccessNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notifySuccessMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  return {
    notifySuccessMessage,
  };
};
