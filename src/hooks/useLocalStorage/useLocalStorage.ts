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
