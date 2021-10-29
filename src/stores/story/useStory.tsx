import { SWRResponse } from 'swr';
import useAspidaSWR from '@aspida/swr';

import { apiClient } from '~/utils/rest-client';
import { Story } from '~/domains';

/**
 * ストーリーを取得するSWR
 * @returns data ストーリー
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStory = (id?: string, fallbackData?: Story): SWRResponse<Story, Error> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useAspidaSWR(apiClient.stories._storyId(id!), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    fallbackData,
    enabled: !!id,
  });
};
