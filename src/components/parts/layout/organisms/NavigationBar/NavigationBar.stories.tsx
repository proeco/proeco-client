import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Component } from '~/components/parts/layout/organisms/NavigationBar';
import { createMockUser } from '~/mock';

export default {
  title: 'parts/layout/organisms/NavigationBar',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ currentUser }) => {
  return <Component currentUser={currentUser} />;
};

export const GuestUser = Template.bind({});
GuestUser.args = {
  currentUser: undefined,
};

export const LoginUser = Template.bind({});
LoginUser.args = {
  currentUser: createMockUser({ image: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' }),
};
