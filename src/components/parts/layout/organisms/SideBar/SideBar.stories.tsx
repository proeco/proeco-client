import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Component } from './SideBar';

import { createMockStory, createMockUser } from '~/mock';

export default {
  title: 'parts/layout/organisms/SideBar',
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
  currentUser: createMockUser({ image: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' }),
  docs: [
    createMockStory({
      title: '️Proecoを開発する',
      emojiId: 'tada',
    }),
  ],
};
