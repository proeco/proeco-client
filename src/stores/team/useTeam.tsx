import { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { restClient } from '~/utils/rest-client';
import { Team } from '~/domains';

/**
 * teamId をもとにteamを取得するSWR
 * @returns data チーム
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useTeam = ({ teamId }: { teamId?: string }): SWRResponse<Team, Error> => {
  const key = teamId ? `/teams/${teamId}` : null;
  return useImmutableSWR(key, (endpoint: string) => restClient.apiGet<Team>(endpoint).then((result) => result.data));
};
