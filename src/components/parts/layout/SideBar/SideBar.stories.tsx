import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Component } from './SideBar';

import { createMockStory, createMockUser } from '~/mock';

import { URLS } from '~/constants/urls';

export default {
  title: 'parts/layout/SideBar',
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
  storiesData: {
    totalDocs: 10,
    stories: [
      createMockStory({
        title: '️Proecoを開発する',
        emojiId: 'hammer',
      }),
      createMockStory({
        title: '️️毎日記事を書く',
        emojiId: 'pencil2',
      }),
      createMockStory({
        title: '️YouTube動画制作',
        emojiId: 'movie_camera',
      }),
    ],
  },
  asPath: URLS.DASHBOARD,
};
