import { SWRResponse } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { Reaction, User } from '~/domains';

/**
 * userIdに紐づいた reaction を取得するSWR
 * @params attachmentId 取得対象のファイルID
 * @returns data attachmentUrl
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useReactionsByUserId = (userId?: User['_id']): SWRResponse<Reaction[], Error> => {
  const key = userId ? `/reactions?createdUserId=${userId}` : null;

  return useSWRImmutable(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data.reactions.docs));
};
