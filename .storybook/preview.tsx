import * as nextImage from 'next/image';
import React from 'react';
import { addDecorator} from '@storybook/react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import { theme } from '../src/theme';

if(process.env.NODE_ENV === "test"){
  const { server } = require('../src/mocks/server');
  server.listen();
}else{
  const { worker } = require('../src/mocks/browser');
  worker.start()
}

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props:any) => {
    return <img {...props} />;
  },
});


addDecorator((story) => {
  return <MaterialThemeProvider theme={theme}>{story()}</MaterialThemeProvider>
});
  
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}