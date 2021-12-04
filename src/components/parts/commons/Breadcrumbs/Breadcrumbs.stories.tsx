import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Breadcrumbs } from './Breadcrumbs';

export default {
  title: 'parts/commons/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <Breadcrumbs {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  BreadcrumbsItems: [
    {
      url: '/teamId',
      label: 'チーム',
    },
    {
      url: '/team/story',
      label: 'ストーリーリスト',
    },
    {
      label: 'ストーリー詳細',
    },
  ],
};
