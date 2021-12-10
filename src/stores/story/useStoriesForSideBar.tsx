import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { convertStoryFromServer, Story } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * SideBarで使用する複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoriesForSideBar = ({
  userId,
  page,
  limit,
}: {
  userId?: string;
  page: number;
  limit: 3;
}): SWRResponse<{ totalDocs: number; stories: Story[] }, Error> => {
  const key = userId ? `/stories?userId=${userId}&page=${page}&limit=${limit}` : null;
  return useImmutableSWR(key, (endpoint: string) =>
    restClient.apiGet<PaginationResult<Story>>(endpoint).then((result) => {
      return { totalDocs: result.data.totalDocs, stories: result.data.docs.map((v) => convertStoryFromServer(v)) };
    }),
  );
};
