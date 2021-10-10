import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { UserIconGroup } from './UserIconGroup';
import { createMockUser } from '~/mock/createMockUser';

export default {
  title: 'domains/user/organisms/UserIconGroup',
  component: UserIconGroup,
} as ComponentMeta<typeof UserIconGroup>;

const mockUser = createMockUser({ _id: 'hoge', image: 'https://pbs.twimg.com/profile_images/1334520870811750401/gdnAYVqz_400x400.jpg' });

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
