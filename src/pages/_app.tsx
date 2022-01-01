import { ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { SWRConfig } from 'swr';

import '~/styles/global.scss';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';

import { CurrentUserProvider } from '~/hooks/CurrentUserProvider';
import { AccessControlProvider } from '~/hooks/AccessControlProvider';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';

function MyApp({ Component, pageProps }: { Component: ProecoNextPage; pageProps: { children?: ReactNode } }): JSX.Element {
  const getLayout = Component.getLayout || ((page) => page);

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK === 'TRUE') {
    const startServer = () => import('~/mocks/worker');
    startServer();
  }

  return (
    <UserProvider>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <CurrentUserProvider>
          <AccessControlProvider getAccessControl={Component.getAccessControl}>
            <NavigationBar />
            {getLayout(<Component {...pageProps} />)}
          </AccessControlProvider>
        </CurrentUserProvider>
      </SWRConfig>
    </UserProvider>
  );
}

export default MyApp;
