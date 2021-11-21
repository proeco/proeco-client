import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { UserIconGroup } from './UserIconGroup';
import { createMockUser } from '~/mock/createMockUser';

export default {
  title: 'domains/user/UserIconGroup',
  component: UserIconGroup,
} as ComponentMeta<typeof UserIconGroup>;

const mockUser = createMockUser({ _id: 'hoge' });

const Template: ComponentStory<typeof UserIconGroup> = ({ users, maxCount }) => (
  <Box width="300px" bgcolor="gray" p={4} display="flex" alignItems="center">
    <UserIconGroup users={users} maxCount={maxCount} />
  </Box>
);

export const infinity = Template.bind({});
infinity.args = {
  users: [mockUser, mockUser, mockUser, mockUser, mockUser, mockUser],
  maxCount: Infinity,
};

export const limitation = Template.bind({});
limitation.args = {
  users: [mockUser, mockUser, mockUser, mockUser, mockUser, mockUser],
  maxCount: 3,
};
