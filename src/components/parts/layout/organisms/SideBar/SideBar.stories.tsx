import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { SideBar } from '~/components/parts/layout/organisms/SideBar';

export default {
  title: 'parts/layout/organisms/SideBar',
  component: SideBar,
  argTypes: { openStoryModal: { action: 'open' } },
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = ({ openStoryModal }) => {
  return (
    <Box>
      <SideBar openStoryModal={openStoryModal} />
    </Box>
  );
};

export const Default = Template.bind({});
