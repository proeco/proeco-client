export const useLocalStorage = () => {
  const fetchData = (key: string): string => {
    const value = localStorage.getItem(key);

    if (value !== null) {
      return value;
    }
    return '';
  };

  const storeData = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  return { fetchData, storeData };
};
