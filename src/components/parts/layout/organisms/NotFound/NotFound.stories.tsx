import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotFound } from './NotFound';

export default {
  title: 'parts/layout/organisms/NotFound',
  component: NotFound,
} as ComponentMeta<typeof NotFound>;

const Template: ComponentStory<typeof NotFound> = () => {
  return <NotFound />;
};

export const Default = Template.bind({});
