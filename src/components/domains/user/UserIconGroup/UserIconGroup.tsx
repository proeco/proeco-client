import { VFC } from 'react';

import { AvatarGroup } from '@mui/material';
import { User } from '~/domains';

import { UserIcon } from '~/components/domains/user/UserIcon';

type Props = {
  users: User[];
  maxCount?: number;
  isLink?: boolean;
};

export const UserIconGroup: VFC<Props> = ({ users, maxCount = 3, isLink = false }) => {
  return (
    <AvatarGroup max={maxCount}>
      {users.map((user) => {
        return <UserIcon key={user._id} size={48} userId={user._id} imagePath={user.image} isLink={isLink} />;
      })}
    </AvatarGroup>
  );
};
