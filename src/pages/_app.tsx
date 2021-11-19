import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { GlobalStyles } from '@mui/material';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

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

function MyApp({ Component, pageProps }: { Component: ProecoNextPage; pageProps: { children?: ReactNode; session?: Session } }): JSX.Element {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <>
        <NavigationBar />
        {page}
      </>
    ));

  return (
    <MaterialThemeProvider theme={theme}>
      <SnackbarProvider>
        <SessionProvider session={pageProps.session}>
          {inputGlobalStyles}
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </SnackbarProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
