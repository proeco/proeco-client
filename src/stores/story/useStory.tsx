import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { convertStoryFromServer, Story } from '~/domains';

/**
 * ストーリーを取得するSWR
 * @returns data ストーリー
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStory = (id: string, fallbackData: Story): SWRResponse<Story, Error> => {
  return useSWR(
    `/stories/${id}`,
    (endpoint: string) => restClient.apiGet<Story>(endpoint).then((result) => convertStoryFromServer(result.data)),
    {
      fallbackData,
    },
  );
};
