import { SWRResponse } from 'swr';
import { Story } from '~/domains';
import { useStaticSWR } from '~/stores/useStaticSWR';

/**
 * 更新対象のStoryを取得するSWR
 * @returns data ストーリー
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoryForUpdate = (initialData?: Story): SWRResponse<Story, Error> => {
  return useStaticSWR<Story, Error>('useStoryForUpdate', initialData);
};
