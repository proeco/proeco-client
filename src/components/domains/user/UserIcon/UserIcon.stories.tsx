import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { rest } from 'msw';
import { UserIcon, GuestUserIcon } from './UserIcon';
import { createMockUser } from '~/mocks/domains/createMockUser';
import { worker } from '~/mocks/browser';

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const LoginUser: ComponentStory<typeof UserIcon> = ({ ...props }) => {
  worker.use(
    rest.get('http://localhost:8000/api/v1/attachments/:id', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json('https://itizawa-tech.growi.cloud/attachment/619cf4648062e8c5ac7e684f'));
    }),
  );
  return (
    <Box width="300px" bgcolor="gray" p={4} display="flex" alignItems="center" justifyContent="space-around">
      <UserIcon {...props} size={40} />
      <UserIcon {...props} size={60} />
      <UserIcon {...props} size={80} />
    </Box>
  );
};

const GuestUser: ComponentStory<typeof UserIcon> = ({ ...props }) => {
  return (
    <Box width="300px" bgcolor="gray" p={4} display="flex" alignItems="center" justifyContent="space-around">
      <GuestUserIcon {...props} size={40} />
      <GuestUserIcon {...props} size={60} />
      <GuestUserIcon {...props} size={80} />
    </Box>
  );
};

const mockUser = createMockUser({ _id: 'hoge' });

export const loginUser = LoginUser.bind({});
loginUser.args = {
  attachmentId: mockUser.iconImageId,
  userId: mockUser._id,
};
export const guestUser = GuestUser.bind({});
