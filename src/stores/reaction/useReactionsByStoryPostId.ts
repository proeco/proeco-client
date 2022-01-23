import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { Reaction, StoryPost } from '~/domains';
import { PaginationResult } from '~/interfaces';
import { convertReactionFromServer } from '~/domains/reaction';

/**
 * StoryPostIdに紐づいた reaction を取得するSWR
 * @params attachmentId 取得対象のファイルID
 * @returns data attachmentUrl
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useReactionsByStoryPostId = (StoryPostId?: StoryPost['_id']): SWRResponse<Reaction[], Error> => {
  const key = StoryPostId ? `/reactions?targetId=${StoryPostId}` : null;

  return useSWR(key, (endpoint: string) =>
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
