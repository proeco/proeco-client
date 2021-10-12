import * as nextImage from 'next/image';
import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import { theme } from '../src/theme';


Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});

addDecorator((story) => (
  <MaterialThemeProvider theme={theme}>{story()}</MaterialThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}