import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Component } from './UserSideBar';

import { createMockUser } from '~/mock';

import { URLS } from '~/constants/urls';

export default {
  title: 'domains/user/UserSideBar',
  component: Component,
  argTypes: {
    openCreateStoryModal: { action: 'openCreateStoryModal' },
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ ...rest }) => {
  return <Component {...rest} />;
};

export const Default = Template.bind({});

Default.args = {
  currentUser: createMockUser(),
  asPath: URLS.DASHBOARD,
};
