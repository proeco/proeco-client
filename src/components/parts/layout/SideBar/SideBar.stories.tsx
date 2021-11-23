import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Icon } from '../../commons';
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

const mockUser = createMockUser({ name: 'Proeco' });
const signedUrl = 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574';

const openContent = (
  <Box display="flex" alignItems="center" flexDirection="column" borderBottom="1px solid #eaecf1" pb="16px">
    <UserIcon size={80} signedUrl={signedUrl} userId={mockUser._id} isLink />
    <Typography variant="h3">{mockUser.name}</Typography>
  </Box>
);

const closeContent = (
  <Box display="flex" alignItems="center" flexDirection="column" borderBottom="1px solid #eaecf1" width="fit-content" pb="16px" pt="46px">
    <UserIcon size={40} signedUrl={signedUrl} userId={mockUser._id} isLink />
  </Box>
);

export const DefaultSideBar = Template.bind({});
DefaultSideBar.args = {
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

export const SideBarWithUserIcon = Template.bind({});
SideBarWithUserIcon.args = {
  ...DefaultSideBar.args,
  currentUserInfo: { userId: 'Proeco', name: 'Proeco', signedUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' },
  menuItems: [
    {
      icon: <Icon icon="Logout" width="20px" color="textColor.main" />,
      text: 'Logout',
      onClick: action('signOut'),
    },
  ],
};
