import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import '~/styles/global.scss';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';

import { CurrentUserProvider } from '~/hooks/CurrentUserProvider';
import { AccessControlProvider } from '~/hooks/AccessControlProvider';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';
import { Footer } from '~/components/parts/layout/Footer';

function MyApp({ Component, pageProps }: { Component: ProecoNextPage; pageProps: { session: Session; children?: ReactNode } }): JSX.Element {
  if (process.env.NEXT_PUBLIC_ENABLE_MOCK === 'TRUE') {
    const startServer = () => import('~/mocks/worker');
    startServer();
  }

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <CurrentUserProvider>
          <AccessControlProvider getAccessControl={Component.getAccessControl}>
            <NavigationBar />
            <Component {...pageProps} />
            <Footer />
          </AccessControlProvider>
        </CurrentUserProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
