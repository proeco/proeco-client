import { SWRResponse } from 'swr';
import { useStaticSWR } from '~/stores/useStaticSWR';

/**
 * モーダルが開閉状況を取得するSWR
 * @returns data ストーリーリスト
 * @returns isValidating 取得中を表す boolean
 * @returns error エラー
 * @returns mutate データの更新関数
 */
export const useIsOpenCreateNewStoryModal = (initialData?: boolean): SWRResponse<boolean | null, Error> => {
  return useStaticSWR<boolean | null, Error>('useIsOpenCreateNewStoryModal', initialData);
};
