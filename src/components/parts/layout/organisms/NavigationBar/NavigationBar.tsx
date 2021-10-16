import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { memo, VFC, useState, MouseEvent } from 'react';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Logout } from '@mui/icons-material';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { UserIcon } from '~/components/domains/user/atoms/UserIcon';
import { Button } from '~/components/parts/commons/atoms';
import { Menu } from '~/components/parts/commons/organisms/Menu';
import { User } from '~/domains';

type Props = {
  currentUser?: User;
  onClickLoginButton: () => void;
};

const menuItems = [
  {
    icon: <Logout fontSize="small" sx={{ color: 'textColor.main' }} />,
    text: 'Logout',
    onClick: () => console.log('click'),
  },
];

export const Component: VFC<Props> = memo(({ currentUser, onClickLoginButton }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Link href="/">
        <a>
          <Image src="/images/Original.svg" alt="Proeco Logo" width={195} height={40} />
        </a>
      </Link>
      {currentUser ? (
        <>
          <StyledUserIcon size="small" imagePath={currentUser.image} userId={currentUser._id} onClick={handleClick} />
          <Menu anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
        </>
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

const StyledUserIcon = styled(UserIcon)`
  cursor: pointer;
`;

export const NavigationBar: VFC = memo(() => {
  const { data: currentUser } = useCurrentUser();

  const handleClickLoginButton = () => {
    signIn('google');
  };

  return <Component currentUser={currentUser} onClickLoginButton={handleClickLoginButton} />;
});
