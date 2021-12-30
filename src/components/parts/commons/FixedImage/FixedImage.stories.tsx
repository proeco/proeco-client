import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FixedImage, SkeltonFixedImage } from './FixedImage';

export default {
  title: 'parts/commons/FixedImage',
  component: FixedImage,
} as ComponentMeta<typeof FixedImage>;

const Template: ComponentStory<typeof FixedImage> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <FixedImage {...rest}></FixedImage>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  imageUrl: 'https://www.webev.cloud//images/eye-catch-dark.png',
};

export const NotFound = Template.bind({});
NotFound.args = {};

const SkeltonTemplate: ComponentStory<typeof SkeltonFixedImage> = () => {
  return (
    <div className="p-4">
      <SkeltonFixedImage></SkeltonFixedImage>
    </div>
  );
};

export const Skelton = SkeltonTemplate.bind({});
