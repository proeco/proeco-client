import React, { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { action } from '@storybook/addon-actions';
import { Icon } from '../Icon';
import { TimeLine } from './TimeLine';
import { createMockStoryPost } from '~/mock';

export default {
  title: 'parts/commons/TimeLine',
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

const Template: ComponentStory<typeof TimeLine> = ({ ...rest }) => {
  return (
    <Box p="20px" bgcolor="#E5E5E5">
      <TimeLine {...rest}></TimeLine>
    </Box>
  );
};

const mockStoryPosts = [
  createMockStoryPost({ title: 'TimeLineItem１' }),
  createMockStoryPost({ title: 'TimeLineItem2' }),
  createMockStoryPost({ title: 'TimeLineItem3' }),
];

const defaultTimeLineItems: {
  title: string;
  imagePath?: string;
  name?: string;
  children: React.ReactNode;
  actions: {
    icon: ComponentProps<typeof Icon>['icon'];
    name: string;
    onClick: () => void;
  }[];
}[] = mockStoryPosts.map((mockStoryPost) => {
  return {
    title: mockStoryPost.title,
    imagePath: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574',
    children: <Box width="500px" height="250px"></Box>,
    actions: [
      {
        icon: 'Delete',
        name: '削除',
        onClick: action('clickDeleteButton'),
      },
      {
        icon: 'Update',
        name: '更新',
        onClick: action('clickUpdateButton'),
      },
    ],
  };
});

const timeLineItemsWithoutImage: {
  title: string;
  imagePath?: string;
  name?: string;
  children: React.ReactNode;
  actions: {
    icon: ComponentProps<typeof Icon>['icon'];
    name: string;
    onClick: () => void;
  }[];
}[] = mockStoryPosts.map((mockStoryPost) => {
  return {
    title: mockStoryPost.title,
    name: 'User',
    children: <Box width="500px" height="250px"></Box>,
    actions: [
      {
        icon: 'Delete',
        name: '削除',
        onClick: action('clickDeleteButton'),
      },
      {
        icon: 'Update',
        name: '更新',
        onClick: action('clickUpdateButton'),
      },
    ],
  };
});

export const DefaultTimeLine = Template.bind({});
DefaultTimeLine.args = {
  timeLineItems: defaultTimeLineItems,
};

export const TimeLineWithoutImage = Template.bind({});
TimeLineWithoutImage.args = {
  timeLineItems: timeLineItemsWithoutImage,
};
