import { AppProps } from 'next/app';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { NavigationBar } from '~/components/parts/layout/organisms/NavigationBar/NavigationBar';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <NavigationBar />
        <Component {...pageProps} />
      </StyledThemeProvider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
