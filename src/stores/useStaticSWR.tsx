import useSWR, { Key, SWRResponse, mutate, Fetcher } from 'swr';

export const useStaticSWR = <Data, Error>(key: Key, updateData?: Data | Fetcher<Data>): SWRResponse<Data, Error> => {
  if (!updateData) {
    mutate(key, updateData);
  }

  return useSWR(key, null, {
    revalidateOnReconnect: false,
  });
};
