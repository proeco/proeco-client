import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Component } from './NotFound';

export default {
  title: 'parts/layout/organisms/NotFound',
  component: Component,
} as ComponentMeta<typeof Component>;

const ERROR_URL = 'https://itizawa-tech.growi.cloud/attachment/616ac89556919852099e354e';

const Template: ComponentStory<typeof Component> = ({ message, ErrorImagePath }) => {
  return <Component message={message} ErrorImagePath={ErrorImagePath} />;
};

export const Default = Template.bind({});
Default.args = {
  ErrorImagePath: ERROR_URL,
};
