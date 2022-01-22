import useSWR, { SWRResponse } from 'swr';
import { Ogp } from '~/interfaces/ogp';
import { joinUrl } from '~/utils/joinUrl';

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
  const key = url !== '' ? joinUrl('/ogps', [`url=${url}`]) : null;

  return useSWR(key, (endpoint: string) => restClient.apiGet<{ ogp: Ogp }>(endpoint).then((result) => result.data.ogp));
};
