import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { UserIcon } from './UserIcon';
import { createMockUser } from '~/mock/createMockUser';

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const Template: ComponentStory<typeof UserIcon> = ({ ...rest }) => (
  <Box width="300px" bgcolor="gray" p={4} display="flex" alignItems="center" justifyContent="space-around">
    <UserIcon {...rest} size={40} />
    <UserIcon {...rest} size={60} />
    <UserIcon {...rest} size={80} />
  </Box>
);

const mockUser = createMockUser({ _id: 'hoge', image: 'https://itizawa-tech.growi.cloud/attachment/616289c6c4e99c0051b30574' });

export const guestUser = Template.bind({});
export const loginUser = Template.bind({});
loginUser.args = {
  imagePath: mockUser.image,
  userId: mockUser._id,
};
