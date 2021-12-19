import { SnackbarProvider } from 'notistack';
import { GlobalStyles } from '@mui/material';
import { ReactNode } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { UserProvider } from '@auth0/nextjs-auth0';

import 'modern-css-reset/dist/reset.min.css';
import '~/styles/global.scss';

import { theme } from '../theme';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';
import { CurrentUserProvider } from '~/hooks/CurrentUserProvider';
import { AccessControlProvider } from '~/hooks/AccessControlProvider';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        MsOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
      '*::-webkit-scrollbar': { display: 'none' },
      body: {
        backgroundColor: `${theme.palette.backgroundColor.main}`,
      },
    }}
  />
);

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
          <CurrentUserProvider>
            <AccessControlProvider getAccessControl={Component.getAccessControl}>
              {inputGlobalStyles}
              <NavigationBar />
              {getLayout(<Component {...pageProps} />)}
            </AccessControlProvider>
          </CurrentUserProvider>
        </SnackbarProvider>
      </MaterialThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
