import { SWRResponse } from 'swr';
import { useStaticSWR } from '~/stores/useStaticSWR';

/**
 * DeleteStoryTaskModalが開閉状況を取得するSWR
 * @returns data モーダルの開閉状態 boolean
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useIsOpenDeleteStoryTaskModal = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR<boolean, Error>('useIsOpenDeleteStoryTaskModal', initialData);
};
