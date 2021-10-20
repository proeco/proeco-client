import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { memo, VFC, useState, useMemo, MouseEvent } from 'react';
import { AppBar, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Logout } from '@mui/icons-material';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { UserIcon } from '~/components/domains/user/atoms/UserIcon';
import { Button } from '~/components/parts/commons/atoms';
import { Menu } from '~/components/parts/commons/organisms/Menu';
import { User } from '~/domains';

import { IMAGE_PATH } from '~/constants';

import { LoginModal } from '~/components/parts/authentication/LoginModal';

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

  const Contents = useMemo(() => {
    if (isValidating) return <Skeleton variant="circular" width={40} height={40} />;

    if (currentUser) {
      return (
        <>
          <StyledUserIcon size="small" imagePath={currentUser.image} userId={currentUser._id} onClick={handleClick} />
          <Menu anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
        </>
      );
    }

    return (
      <StyledButton bold onClick={onClickLoginButton}>
        Login Button
      </StyledButton>
    );
  }, [isValidating, currentUser, anchorEl, open, menuItems]);

  return (
    <StyledAppBar position="static">
      <Link href="/">
        <a>
          <Image src={logoImagePath} alt="Proeco Logo" width={195} height={40} />
        </a>
      </Link>
      {Contents}
    </StyledAppBar>
  );
});

const StyledAppBar = styled(AppBar)`
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
      icon: <Logout fontSize="small" sx={{ color: 'textColor.main' }} />,
      text: 'Logout',
      onClick: () => signOut(),
    },
  ];

  const { data: currentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleClickLoginButton = () => {
    // signIn('google');
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <Component
        currentUser={currentUser}
        isValidating={isValidatingCurrentUser}
        onClickLoginButton={handleClickLoginButton}
        menuItems={menuItems}
        logoImagePath={IMAGE_PATH.LOGO}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
});
