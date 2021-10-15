import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { SnackbarProvider } from "notistack";
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import 'modern-css-reset/dist/reset.min.css';

import { theme } from '../theme';
import { NavigationBar } from '~/components/parts/layout/organisms/NavigationBar/NavigationBar';
import { DashboardModals } from '~/components/parts/layout/organisms/DashboardModals';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <MaterialThemeProvider theme={theme}>
      <SnackbarProvider>
      <Provider
        options={{ clientMaxAge: 0, keepAlive: 0 }}
        session={pageProps.session}
      >
        <NavigationBar />
        <Component {...pageProps} />
        {/* TODO: Dashboard レイアウトができたら移動する */}
        <DashboardModals />
      </Provider>
      </SnackbarProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
