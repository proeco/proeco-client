import { useCallback } from 'react';
import { success } from 'toastr';

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
 * ユーザーにSUCCESSを知らせるためのSnackbarを表示させるhooks
 * @returns notifySuccessMessage SUCCESSのSnackbarを出す関数
 */
export const useSuccessNotification = () => {
  const notifySuccessMessage = useCallback((message: string) => {
    success(message, 'Success', option);
  }, []);

  return {
    notifySuccessMessage,
  };
};
