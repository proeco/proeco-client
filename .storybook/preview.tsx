import * as nextImage from 'next/image';
import React from 'react';
import { addDecorator} from '@storybook/react';

import '../src/styles/global.scss';

const { worker } = require('../src/mocks/browser');
worker.start()

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props:any) => {
    return <img {...props} />;
  },
});


addDecorator((story) => {
  return story()
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