import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { convertStoryPostFromServer, StoryPost } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoryPosts = ({
  storyId,
  page,
  limit,
}: {
  storyId?: string;
  page: number;
  limit: number;
}): SWRResponse<StoryPost[], Error> => {
  const key = storyId ? `/story-posts?storyId=${storyId}&page=${page}&limit=${limit}` : null;
  return useImmutableSWR(
    key,
    (endpoint: string) =>
      restClient.apiGet<PaginationResult<StoryPost>>(endpoint).then((result) => result.data.docs.map((v) => convertStoryPostFromServer(v))),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );
};
