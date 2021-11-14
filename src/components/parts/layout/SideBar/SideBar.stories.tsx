import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { SideBar } from './SideBar';

import { createMockUser } from '~/mock';

import { URLS } from '~/constants/urls';
import { UserIcon } from '~/components/domains/user/UserIcon';

export default {
  title: 'parts/layout/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = ({ ...rest }) => {
  return <SideBar {...rest} />;
};

export const Default = Template.bind({});

const mockUser = createMockUser({ name: 'Proeco', image: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' });

const openContent = (
  <Box display="flex" alignItems="center" flexDirection="column" borderBottom="1px solid #eaecf1" pb="16px">
    <UserIcon size={80} imagePath={mockUser.image} userId={mockUser._id} isLink />
    <Typography variant="h3">{mockUser.name}</Typography>
  </Box>
);

const closeContent = (
  <Box display="flex" alignItems="center" flexDirection="column" borderBottom="1px solid #eaecf1" width="fit-content" pb="16px" pt="46px">
    <UserIcon size={40} imagePath={mockUser.image} userId={mockUser._id} isLink />
  </Box>
);

Default.args = {
  asPath: URLS.DASHBOARD,
  openContent: openContent,
  closeContent: closeContent,
  sidebarItems: [
    {
      icon: 'DashboardOutlined',
      url: URLS.DASHBOARD,
      text: 'ホーム',
    },
    {
      icon: 'Group',
      url: URLS.DASHBOARD_TEAMS,
      text: 'チーム',
    },
    {
      icon: 'Settings',
      url: URLS.DASHBOARD_SETTINGS,
      text: '設定',
    },
  ],
};
