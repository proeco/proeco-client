import { useSnackbar } from 'notistack';

/**
 * ユーザーにERRORを知らせるためのSnackbarを表示させるhooks
 * @returns notifySuccessMessage ERRORのSnackbarを出す関数
 */
export const useErrorNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notifyErrorMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  return {
    notifyErrorMessage,
  };
};
