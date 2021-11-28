import { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { Ogp } from '~/interfaces/ogp';

import { restClient } from '~/utils/rest-client';

/**
 * Ogpを取得するSWR
 * @params url
 * @returns data attachmentUrl
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useOgp = (url: string): SWRResponse<Ogp, Error> => {
  const key = `/ogps?url=${url}`;

  return useSWRImmutable(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data.ogp));
};
