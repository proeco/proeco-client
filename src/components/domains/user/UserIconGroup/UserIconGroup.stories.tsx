import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { UserIconGroup } from './UserIconGroup';

export default {
  title: 'domains/user/UserIconGroup',
  component: UserIconGroup,
} as ComponentMeta<typeof UserIconGroup>;

const mockUserInfo = { userId: 'Proeco', name: 'Proeco', signedUrl: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' };

const Template: ComponentStory<typeof UserIconGroup> = ({ usersInfo, maxCount }) => (
  <Box width="300px" bgcolor="gray" p={4} display="flex" alignItems="center">
    <UserIconGroup usersInfo={usersInfo} maxCount={maxCount} />
  </Box>
);

export const infinity = Template.bind({});
infinity.args = {
  usersInfo: [mockUserInfo, mockUserInfo, mockUserInfo, mockUserInfo, mockUserInfo, mockUserInfo],
  maxCount: Infinity,
};

export const limitation = Template.bind({});
limitation.args = {
  usersInfo: [mockUserInfo, mockUserInfo, mockUserInfo, mockUserInfo, mockUserInfo, mockUserInfo],
  maxCount: 3,
};
