import { SWRResponse } from 'swr';
import { StoryTask } from '~/domains';
import { useStaticSWR } from '~/stores/useStaticSWR';

/**
 * 削除対象のStoryTaskを取得するSWR
 * @returns data ストーリータスク
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoryTaskForDelete = (initialData?: StoryTask): SWRResponse<StoryTask, Error> => {
  return useStaticSWR<StoryTask, Error>('useStoryTaskForDelete', initialData);
};
