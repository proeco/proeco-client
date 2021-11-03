import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { action } from '@storybook/addon-actions';
import { Component } from './TeamMenu';
import { createMockTeam } from '~/mock';
import { UserIcon } from '~/components/domains/user/UserIcon';

export default {
  title: 'domains/team/TeamMenu',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ ...rest }) => {
  return (
    <Box width="280px" p="16px">
      <Component {...rest} />
    </Box>
  );
};

const mockTeam = createMockTeam({ name: 'Proeco', iconImage: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' });

export const Default = Template.bind({});
Default.args = {
  currentTeam: mockTeam,
  menuItems: [
    {
      icon: <UserIcon imagePath="https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574" size={24} />,
      text: 'Proeco',
      onClick: action('clickMenuItem'),
    },
  ],
};
