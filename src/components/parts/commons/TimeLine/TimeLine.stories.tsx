import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { action } from '@storybook/addon-actions';
import { TimeLine } from './TimeLine';

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

export const Default = Template.bind({});
Default.args = {
  timeLineItems: [
    {
      title: 'TimeLineItem１',
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
    },
    {
      title: 'TimeLineItem２',
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
    },
    {
      title: 'TimeLineItem３',
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
    },
  ],
};
