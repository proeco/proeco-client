/**
 * url からハッシュの値を取得する
 * @param {string} url
 * @returns string
 */
export const extractHash = (url: string): string => {
  return url.split('#')[1] ?? '';
};
