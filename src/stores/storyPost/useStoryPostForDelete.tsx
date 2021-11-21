import { SWRResponse } from 'swr';
import { StoryPost } from '~/domains';
import { useStaticSWR } from '~/stores/useStaticSWR';

/**
 * 削除対象のStoryPostを取得するSWR
 * @returns data ストーリーポスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useStoryPostForDelete = (initialData?: StoryPost): SWRResponse<StoryPost, Error> => {
  return useStaticSWR<StoryPost, Error>('useStoryPostForDelete', initialData);
};
