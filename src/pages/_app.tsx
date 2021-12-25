import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { UserProvider } from '@auth0/nextjs-auth0';
import { SWRConfig } from 'swr';

import '~/styles/global.scss';

import { theme } from '../theme';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';
import { CurrentUserProvider } from '~/hooks/CurrentUserProvider';
import { AccessControlProvider } from '~/hooks/AccessControlProvider';

function MyApp({ Component, pageProps }: { Component: ProecoNextPage; pageProps: { children?: ReactNode } }): JSX.Element {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK === 'TRUE') {
    const startServer = () => import('~/mocks/worker');
    startServer();
  }

  return (
    <UserProvider>
      <MaterialThemeProvider theme={theme}>
        <SnackbarProvider>
          <SWRConfig value={{ revalidateOnFocus: false }}>
            <CurrentUserProvider>
              <AccessControlProvider getAccessControl={Component.getAccessControl}>
                <NavigationBar />
                {getLayout(<Component {...pageProps} />)}
              </AccessControlProvider>
            </CurrentUserProvider>
          </SWRConfig>
        </SnackbarProvider>
      </MaterialThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
