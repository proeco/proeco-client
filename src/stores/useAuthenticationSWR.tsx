import useSWR, { Key, SWRResponse } from 'swr';
import { Fetcher, PublicConfiguration, SWRConfiguration } from 'swr/dist/types';
import { useSession } from 'next-auth/client';
import useAspidaSWR from '@aspida/swr';

export const useAuthenticationSWR = <Data, Error>(_key: Key, fetcher: Fetcher<Data>, option: SWRConfiguration): SWRResponse<Data, Error> => {
  const [session] = useSession();
  const key = session ? _key : null;

  return useSWR(key, fetcher, option);
};

export const newUseAuthenticationSWR = <Data, Error>(
  aspida: Record<string, unknown> & { get: unknown; $get: (option?: { [key: string]: unknown }) => Promise<Data>; $path: () => string },
  option: Partial<PublicConfiguration<Data, Error, Fetcher<Data>>> & { enabled?: boolean | undefined } & { headers?: { Authorization: string } } & {
    query: { [key: string]: string | number | undefined };
  },
): SWRResponse<Data, Error> => {
  const [session] = useSession();
  option.headers = { Authorization: `Bearer ${session?.accessToken}` };
  option.enabled = !!session?.accessToken;

  return useAspidaSWR(aspida, option);
};
