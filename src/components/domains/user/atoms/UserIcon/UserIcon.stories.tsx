import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { UserIcon } from './UserIcon';

export default {
  title: 'domains/user/atoms/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const Template: ComponentStory<typeof UserIcon> = ({ ...rest }) => (
  <Box display="flex" alignItems="center">
    <UserIcon {...rest} size="small" />
    <UserIcon {...rest} size="midium" />
    <UserIcon {...rest} size="large" />
  </Box>
);

export const guestUser = Template.bind({});
export const loginUser = Template.bind({});
