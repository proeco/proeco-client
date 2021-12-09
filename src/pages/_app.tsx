import { ReactNode } from 'react';
import { GlobalStyles } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import 'modern-css-reset/dist/reset.min.css';

import { theme } from '../theme';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';

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

function MyApp({ Component, pageProps }: { Component: ProecoNextPage; pageProps: { session: Session; children?: ReactNode } }): JSX.Element {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK === 'TRUE') {
    const startServer = () => import('~/mocks/worker');
    startServer();
  }

  return (
    <MaterialThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        <SnackbarProvider>
          {inputGlobalStyles}
          <NavigationBar />
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </SessionProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
