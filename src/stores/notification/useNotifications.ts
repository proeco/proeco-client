import useSWR, { SWRResponse } from 'swr';
import { restClient } from '~/utils/rest-client';
import { Notification, convertNotificationFromServer } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * Notificationを取得するSWR
 * @returns data
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useNotifications = (): SWRResponse<Notification[], Error> => {
  return useSWR(`/notifications/me`, (endpoint: string) =>
    restClient.apiGet<PaginationResult<Notification>>(endpoint).then((result) => {
      return result.data.docs.map((doc) => {
        return convertNotificationFromServer(doc);
      });
    }),
  );
};
