import * as nextImage from 'next/image';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { addDecorator} from '@storybook/react';

import '../src/styles/global.scss';

import { worker } from '../src/mocks/browser';
worker.start()

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props:any) => {
    return <img {...props} />;
  },
});


addDecorator((story) => {
  return (
    <SnackbarProvider>
      {story()}
    </SnackbarProvider>
  )
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