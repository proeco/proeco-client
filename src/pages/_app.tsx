import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { GlobalStyles } from '@mui/material';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import 'modern-css-reset/dist/reset.min.css';

import { theme } from '../theme';
import { AuthProvider } from '~/contexts/CurrentUserProvider';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

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
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      <MaterialThemeProvider theme={theme}>
        <SnackbarProvider>
          <SessionProvider session={pageProps.session}>
            {inputGlobalStyles}
            <NavigationBar />
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </SnackbarProvider>
      </MaterialThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
