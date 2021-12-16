const BUCKET_URL = 'https://storage.googleapis.com/proeco/';

/**
 * filePathからBucketUrlを生成する
 * @param {string} filePath
 * @returns string
 */
export const generateBucketUrl = (filePath: string) => {
  return `${BUCKET_URL}/${filePath}`;
};
