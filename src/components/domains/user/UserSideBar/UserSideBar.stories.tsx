import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Component } from './UserSideBar';

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
  currentUserInfo: { userId: 'user', name: 'user', signedUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' },
  asPath: URLS.DASHBOARD,
};
