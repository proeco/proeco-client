/**
 * localStorageに値を保存、取得するhooks
 * @returns fetchData localStorageから値を取得して返す関数
 * @returns storeData localStorageに値をセットする関数
 */
export const useLocalStorage = () => {
  const fetchData = <T>(key: string): T | null => {
    const value = localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  };

  const storeData = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { fetchData, storeData };
};
