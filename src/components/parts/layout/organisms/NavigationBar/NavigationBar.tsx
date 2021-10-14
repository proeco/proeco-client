import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { memo, VFC } from 'react';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { UserIcon } from '~/components/domains/user/atoms/UserIcon';
import { Button } from '~/components/parts/commons/atoms';
import { User } from '~/domains';

type Props = {
  currentUser?: User;
  onClickLoginButton: () => void;
};

export const Component: VFC<Props> = memo(({ currentUser, onClickLoginButton }) => {
  return (
    <StyledAppBar position="static">
      <Link href="/">
        <a>
          <Image src="/images/Original.svg" alt="Proeco Logo" width={195} height={40} />
        </a>
      </Link>
      {currentUser ? (
        <UserIcon size="small" imagePath={currentUser.image} userId={currentUser._id} />
      ) : (
        <StyledButton bold onClick={onClickLoginButton}>
          Login Button
        </StyledButton>
      )}
    </StyledAppBar>
  );
});

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 12px 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const StyledButton = styled(Button)`
  width: 200px;
  color: #fff;
  background-color: ${(props) => props.theme.palette.secondary.main};
  text-transform: none;
  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.main};
    opacity: 0.7;
  }
`;

export const NavigationBar: VFC = memo(() => {
  const { data: currentUser } = useCurrentUser();

  const handleClickLoginButton = () => {
    signIn('google');
  };

  return <Component currentUser={currentUser} onClickLoginButton={handleClickLoginButton} />;
});
