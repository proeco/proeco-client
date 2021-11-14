import { VFC } from 'react';
import { styled } from '@mui/material/styles';

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
    <StyledAvatarGroup max={maxCount}>
      {users.map((user) => {
        return <UserIcon key={user._id} size={40} userId={user._id} imagePath={user.image} isLink={isLink} />;
      })}
    </StyledAvatarGroup>
  );
};

const StyledAvatarGroup = styled(AvatarGroup)`
  /* デフォルトで右寄せになっているアイコンを左寄せにするため */
  display: flex;
  justify-content: start;
`;
