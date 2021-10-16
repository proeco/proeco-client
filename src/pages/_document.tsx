import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { theme } from '../theme';
import { COLORS } from '~/constants';

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="ja-JP">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" href="/images/favicon.ico" />
          <meta name="theme-color" content={COLORS.PRIMARY} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
