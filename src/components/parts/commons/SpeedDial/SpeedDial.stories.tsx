import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { action } from '@storybook/addon-actions';
import { SpeedDial } from './SpeedDial';

export default {
  title: 'parts/commons/SpeedDial',
  component: SpeedDial,
} as ComponentMeta<typeof SpeedDial>;

const Template: ComponentStory<typeof SpeedDial> = ({ ...rest }) => {
  return (
    <Box p="20px">
      <SpeedDial {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  actions: [
    {
      icon: 'Delete',
      name: '削除',
      onClick: action('clickAction'),
    },
  ],
};
