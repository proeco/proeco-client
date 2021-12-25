import useSWR, { SWRResponse } from 'swr';
import { restClient } from '~/utils/rest-client';
import { convertStoryPostFromServer, StoryPost } from '~/domains';

/**
 * ストーリーポストを取得するSWR
 * @returns data ストーリー
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoryPost = (id?: string): SWRResponse<StoryPost, Error> => {
  const key = id ? `/story-posts/${id}` : null;
  return useSWR(key, (endpoint: string) => restClient.apiGet<StoryPost>(endpoint).then((result) => convertStoryPostFromServer(result.data)));
};
