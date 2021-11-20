import useSWR, { SWRResponse } from 'swr';
import { restClient } from '~/utils/rest-client';
import { StoryTask } from '~/domains';

/**
 * ストーリータスクを取得するSWR
 * @returns data ストーリー
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoryTask = (id?: string): SWRResponse<StoryTask, Error> => {
  const key = id ? `/story-tasks/${id}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};