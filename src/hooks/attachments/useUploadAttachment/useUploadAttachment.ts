import { useCallback, useState } from 'react';
import { Attachment } from '~/domains';
import { restClient } from '~/utils/rest-client';

/**
 * ファイルをアップロードするhooks
 * @returns isLoading 処理中かどうか
 * @returns uploadAttachment attachment作成関数
 */
export const useUploadAttachment = () => {
  const [isLoading, setIsLoading] = useState(false);
  /**
   * attachment作成関数
   * @param file 該当のファイル
   * @param path 保存先の path
   * @returns
   */
  const uploadAttachment = useCallback(async (file: File, path: string) => {
    setIsLoading(true);
    const params = new FormData();

    params.append('file', file);
    const { data: attachment } = await restClient.apiPost<Attachment>(`/attachments?path=${path}`, params, {
      'Content-Type': 'multipart/form-data',
    });

    setIsLoading(false);
    return attachment;
  }, []);

  return { uploadAttachment, isLoading };
};
