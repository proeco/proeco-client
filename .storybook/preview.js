import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import { theme } from '../src/theme';

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