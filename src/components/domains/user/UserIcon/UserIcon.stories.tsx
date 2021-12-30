import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserIcon, GuestUserIcon } from './UserIcon';
import { createMockUser } from '~/mocks/domains/createMockUser';

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const LoginUser: ComponentStory<typeof UserIcon> = ({ ...props }) => {
  return (
    <div className="p-4 d-flex align-items-center gap-4">
      <UserIcon {...props} size={40} />
      <UserIcon {...props} size={60} />
      <UserIcon {...props} size={80} />
    </div>
  );
};

const GuestUser: ComponentStory<typeof UserIcon> = ({ ...props }) => {
  return (
    <div className="p-4 d-flex align-items-center gap-4">
      <GuestUserIcon {...props} size={40} />
      <GuestUserIcon {...props} size={60} />
      <GuestUserIcon {...props} size={80} />
    </div>
  );
};

const mockUser = createMockUser({ _id: 'hoge' });

export const loginUser = LoginUser.bind({});
loginUser.args = {
  attachmentId: mockUser.iconImageId,
  userId: mockUser._id,
};
export const guestUser = GuestUser.bind({});
