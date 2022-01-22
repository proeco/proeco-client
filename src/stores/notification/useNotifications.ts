import useSWR, { SWRResponse } from 'swr';
import { restClient } from '~/utils/rest-client';
import { Notification, convertNotificationFromServer } from '~/domains';

/**
 * Notificationを取得するSWR
 * @returns data
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useNotifications = (): SWRResponse<Notification, Error> => {
  return useSWR(`/notifications/me`, (endpoint: string) =>
    restClient.apiGet<Notification>(endpoint).then((result) => convertNotificationFromServer(result.data)),
  );
};
