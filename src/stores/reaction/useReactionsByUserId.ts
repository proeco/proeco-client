import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { Reaction, User } from '~/domains';
import { PaginationResult } from '~/interfaces';
import { convertReactionFromServer } from '~/domains/reaction';

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

  return useImmutableSWR(key, (endpoint: string) =>
    restClient.apiGet<{ reactions: PaginationResult<Reaction> }>(endpoint).then((result) => {
      const paginate = {
        ...result.data.reactions,
        docs: result.data.reactions.docs.map((doc) => {
          return convertReactionFromServer(doc);
        }),
      };
      return paginate.docs;
    }),
  );
};
