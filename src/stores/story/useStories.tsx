import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { convertStoryFromServer, Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStories = ({
  teamId,
  page,
  limit,
}: {
  teamId?: string;
  page: number;
  limit: 10;
}): SWRResponse<PaginationResult<Story>, Error> => {
  const key = teamId ? `/stories?teamId=${teamId}&page=${page}&limit=${limit}` : `/stories?page=${page}&limit=${limit}`;
  return useImmutableSWR(
    key,
    (endpoint: string) =>
      restClient.apiGet<PaginationResult<Story>>(endpoint).then((result) => {
        return {
          ...result.data,
          docs: result.data.docs.map((doc) => {
            return convertStoryFromServer(doc);
          }),
        };
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
