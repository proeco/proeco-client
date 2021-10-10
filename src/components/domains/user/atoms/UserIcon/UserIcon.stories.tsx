import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { UserIcon } from './UserIcon';
import { createMockUser } from '~/mock/createMockUser';

export default {
  title: 'domains/user/atoms/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const Template: ComponentStory<typeof UserIcon> = ({ ...rest }) => (
  <Box width="300px" display="flex" alignItems="center" justifyContent="space-around">
    <UserIcon {...rest} size="small" />
    <UserIcon {...rest} size="midium" />
    <UserIcon {...rest} size="large" />
  </Box>
);

const mockUser = createMockUser({});

export const guestUser = Template.bind({});
export const loginUser = Template.bind({});
loginUser.args = {
  imagePath: mockUser.image,
  userId: mockUser._id,
};
