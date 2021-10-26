import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * SideBarで使用する複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoriesForSideBar = ({ userId, page, limit }: { userId?: string; page: number; limit: 3 }): SWRResponse<PaginationResult<Story>, Error> => {
  const key = userId ? `/stories?userId=${userId}&page=${page}&limit=${limit}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
