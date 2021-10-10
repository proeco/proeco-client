import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { SideBar } from '~/components/parts/layout/organisms/SideBar';

export default {
  title: 'parts/layout/organisms/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => {
  return (
    <Box>
      <SideBar {...args} />
    </Box>
  );
};

export const Default = Template.bind({});
