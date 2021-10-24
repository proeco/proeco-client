import { SWRResponse } from 'swr';

import { newUseAuthenticationSWR } from '../useAuthenticationSWR';
import { apiClient } from '~/utils/rest-client';
import { Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStories = ({ userId, page, limit }: { userId?: string; page: number; limit: 10 }): SWRResponse<PaginationResult<Story>, Error> => {
  return newUseAuthenticationSWR<PaginationResult<Story>, Error>(apiClient.stories, {
    query: { page, userId, limit },
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
