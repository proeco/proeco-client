import useSWR, { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { convertInvitationTokenFromServer, InvitationToken } from '~/domains';
import { PaginationResult } from '~/interfaces';

/**
 *  teamIdに紐づいたinvitationTokenを取得するSWR
 * @returns data invitationToken
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useInvitationToken = ({
  teamId,
  page,
  limit,
}: {
  teamId?: string;
  page?: number;
  limit?: number;
}): SWRResponse<InvitationToken[], Error> => {
  const key = teamId ? `/invitation-tokens?teamId=${teamId}&page=${page}&limit=${limit}` : null;
  return useSWR(
    key,
    (endpoint: string) =>
      restClient
        .apiGet<PaginationResult<InvitationToken>>(endpoint)
        .then((result) => result.data.docs.map((v) => convertInvitationTokenFromServer(v))),
    {
      revalidateOnReconnect: true,
    },
  );
};
