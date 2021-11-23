import { VFC } from 'react';
import { AvatarGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import { UserIcon } from '~/components/domains/user/UserIcon';

type Props = {
  usersInfo: {
    userId: string;
    name: string;
    signedUrl: string;
  }[];
  maxCount?: number;
  isLink?: boolean;
};

export const UserIconGroup: VFC<Props> = ({ usersInfo, maxCount = 3, isLink = false }) => {
  return (
    <StyledAvatarGroup max={maxCount}>
      {usersInfo.map((userInfo) => {
        return <UserIcon key={userInfo.userId} size={40} userId={userInfo.userId} signedUrl={userInfo.signedUrl} isLink={isLink} />;
      })}
    </StyledAvatarGroup>
  );
};

const StyledAvatarGroup = styled(AvatarGroup)`
  /* デフォルトで右寄せになっているアイコンを左寄せにするため */
  display: flex;
  justify-content: start;
`;
