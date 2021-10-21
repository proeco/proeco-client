import { SWRResponse } from 'swr';
import { useStaticSWR } from '~/stores/useStaticSWR';

/**
 * UpdateStoryModalが開閉状況を取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useIsOpenUpdateStoryModal = (initialData?: boolean): SWRResponse<boolean, Error> => {
  return useStaticSWR<boolean, Error>('useIsOpenUpdateStoryModal', initialData);
};
