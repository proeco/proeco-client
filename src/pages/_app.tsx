import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { GlobalStyles } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { UserProvider } from '@auth0/nextjs-auth0';

import 'modern-css-reset/dist/reset.min.css';

import { theme } from '../theme';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { NavigationBar } from '~/components/parts/layout/NavigationBar';
import { CurrentUserProvider } from '~/hooks/CurrentUserProvider';
import { GetAccessControl } from '~/interfaces/accessControl';

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

const useAccessControl = (getAccessControl: GetAccessControl) => {
  const router = useRouter();
  useEffect(() => {
    const control = async () => {
      const accessControl = await getAccessControl();
      if (!accessControl) return;
      router[accessControl.type](accessControl.destination);
    };
    control();
  }, [getAccessControl, router]);
};

const accessControl = () => {
  throw new Error('getAccessControl が定義されていません。');
};

function MyApp({ Component, pageProps }: { Component: ProecoNextPage; pageProps: { children?: ReactNode } }): JSX.Element {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);

  const { getAccessControl = accessControl } = Component;
  useAccessControl(getAccessControl);

  if (process.env.NEXT_PUBLIC_ENABLE_MOCK === 'TRUE') {
    const startServer = () => import('~/mocks/worker');
    startServer();
  }

  return (
    <UserProvider>
      <CurrentUserProvider>
        <MaterialThemeProvider theme={theme}>
          <SnackbarProvider>
            {inputGlobalStyles}
            <NavigationBar />
            {getLayout(<Component {...pageProps} />)}
          </SnackbarProvider>
        </MaterialThemeProvider>
      </CurrentUserProvider>
    </UserProvider>
  );
}

export default MyApp;
