import { SWRResponse } from 'swr';

import useAspidaSWR from '@aspida/swr';
import { useSession } from 'next-auth/client';
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
  const [session] = useSession();

  return useAspidaSWR(apiClient.stories, {
    query: { page, userId, limit },
    enabled: !!session?.accessToken,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
