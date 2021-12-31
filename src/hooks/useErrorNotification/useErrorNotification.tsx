import { useCallback } from 'react';
import { error } from 'toastr';

const option = {
  closeButton: true,
  progressBar: true,
  newestOnTop: false,
  showDuration: 100,
  hideDuration: 100,
  timeOut: 3000,
  positionClass: 'toast-bottom-left',
};

/**
 * ユーザーにERRORを知らせるためのSnackbarを表示させるhooks
 * @returns notifySuccessMessage ERRORのSnackbarを出す関数
 */
export const useErrorNotification = () => {
  const notifyErrorMessage = useCallback((message: string): void => {
    error(message, 'Error', option);
  }, []);

  return {
    notifyErrorMessage,
  };
};
