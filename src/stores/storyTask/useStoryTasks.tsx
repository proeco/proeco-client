import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { StoryTask } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 * 複数ストーリーを取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoryTasks = ({ storyId, page, limit }: { storyId?: string; page: number; limit: 10 }): SWRResponse<PaginationResult<StoryTask>, Error> => {
  const key = storyId ? `/story-tasks?storyId=${storyId}&page=${page}&limit=${limit}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
