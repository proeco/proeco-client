import { ReactNode } from 'react';
import { Provider } from 'next-auth/client';
import { SnackbarProvider } from 'notistack';
import { GlobalStyles } from '@mui/material';
import { Session } from 'next-auth';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import 'modern-css-reset/dist/reset.min.css';

import { theme } from '../theme';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { CurrentUserProvider } from '~/components/parts/authentication/CurrentUserProvider';

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
    <MaterialThemeProvider theme={theme}>
      <SnackbarProvider>
        <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
          <CurrentUserProvider>
            {inputGlobalStyles}
            <NavigationBar />
            {getLayout(<Component {...pageProps} />)}
          </CurrentUserProvider>
        </Provider>
      </SnackbarProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
