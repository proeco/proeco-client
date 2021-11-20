import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { memo, VFC, useState, useMemo, MouseEvent } from 'react';
import { AppBar, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Button, Icon, Link, Menu } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { LoginModal } from '~/components/parts/authentication/LoginModal';

import { User } from '~/domains';

import { IMAGE_PATH } from '~/constants';

type Props = {
  currentUser?: User;
  isValidating: boolean;
  onClickLoginButton: () => void;
  menuItems: {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }[];
  logoImagePath: string;
};

export const Component: VFC<Props> = memo(({ currentUser, isValidating, onClickLoginButton, menuItems, logoImagePath }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const Contents = useMemo(() => {
    if (isValidating) return <Skeleton variant="circular" width={40} height={40} />;

    if (currentUser) {
      return (
        <>
          <StyledUserIcon size={40} imagePath={currentUser.image} userId={currentUser._id} onClick={handleClick} />
          <Menu anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
        </>
      );
    }

    return (
      <StyledButton bold onClick={() => setIsLoginModalOpen(true)}>
        Login Button
      </StyledButton>
    );
  }, [isValidating, currentUser, anchorEl, open, menuItems]);

  return (
    <>
      <StyledAppBar position="sticky">
        <Link href="/">
          <Image src={logoImagePath} alt="Proeco Logo" width={195} height={40} />
        </Link>
        {Contents}
      </StyledAppBar>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onClickSignInButton={onClickLoginButton} />
    </>
  );
});

const StyledAppBar = styled(AppBar)`
  position: sticky;
  top: 0px;
  z-index: 1300;
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 12px 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  a {
    height: 40px;
  }
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
  const menuItems = [
    {
      icon: <Icon icon="Logout" color="textColor.main" width="20px" />,
      text: 'Logout',
      onClick: () => signOut(),
    },
  ];

  const { data: currentUser } = useCurrentUser();
  console.log(currentUser);

  const handleClickLoginButton = () => {
    signIn('google');
  };

  return <Component currentUser={currentUser} isValidating onClickLoginButton={handleClickLoginButton} menuItems={menuItems} logoImagePath={IMAGE_PATH.LOGO} />;
});
