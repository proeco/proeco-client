import { URLS } from '~/constants/urls';

/**
 * filePathからBucketUrlを生成する
 * @param {string} filePath
 * @returns string
 */
export const generateBucketUrl = (filePath: string) => {
  return `${URLS.BUCKET_URL}/${filePath}`;
};
