import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { GlobalStyles } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import 'modern-css-reset/dist/reset.min.css';

import { theme } from '../theme';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';
import { DashboardModals } from '~/components/parts/layout/DashboardModals';

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

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <MaterialThemeProvider theme={theme}>
      <SnackbarProvider>
        <SessionProvider session={pageProps.session}>
          {inputGlobalStyles}
          <NavigationBar />
          <Component {...pageProps} />
          {/* TODO: Dashboard レイアウトができたら移動する */}
          <DashboardModals />
        </SessionProvider>
      </SnackbarProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
