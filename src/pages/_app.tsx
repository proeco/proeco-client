import { AppProps } from 'next/app';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import 'modern-css-reset/dist/reset.min.css';

import { theme } from '../theme';
import { NavigationBar } from '~/components/parts/layout/organisms/NavigationBar/NavigationBar';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <MaterialThemeProvider theme={theme}>
      <NavigationBar />
      <Component {...pageProps} />
    </MaterialThemeProvider>
  );
}

export default MyApp;
