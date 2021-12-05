import Image from 'next/image';
import { memo, VFC, useState, useMemo } from 'react';
import { AppBar, ListItemIcon, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { Dropdown } from '../../commons/Dropdown';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Button, Icon, Link } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { LoginModal } from '~/components/parts/authentication/LoginModal';

import { User } from '~/domains';

import { IMAGE_PATH, URLS } from '~/constants';
import { useAuth } from '~/hooks/useAuth/useAuth';
import { SkeltonUserIcon } from '~/components/domains/user/UserIcon/UserIcon';

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const Contents = useMemo(() => {
    if (isValidating) return <SkeltonUserIcon size={40} />;

    if (currentUser) {
      return (
        <Dropdown toggle={<StyledUserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} />}>
          {menuItems.map((menuItem, i) => (
            <MenuItem key={i} onClick={menuItem.onClick}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              {menuItem.text}
            </MenuItem>
          ))}
        </Dropdown>
      );
    }

    return (
      <StyledButton bold onClick={() => setIsLoginModalOpen(true)}>
        Login Button
      </StyledButton>
    );
  }, [isValidating, currentUser, menuItems]);

  return (
    <>
      <StyledAppBar position="sticky">
        <Link href="/">
          <Image src={logoImagePath} alt="Proeco Logo" width={195} height={40} />
        </Link>
        {Contents}
      </StyledAppBar>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onClickSignInButton={() => {
          setIsLoginModalOpen(false);
          onClickLoginButton();
        }}
      />
    </>
  );
});

const StyledAppBar = styled(AppBar)`
  position: sticky;
  top: 0px;
  z-index: 1300;
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 8px 12px;
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
  const router = useRouter();
  const { login, logout } = useAuth();
  const menuItems = [
    {
      icon: <Icon icon="PersonOutline" color="textColor.main" width="20px" />,
      text: '個人設定画面',
      onClick: () => router.push(URLS.DASHBOARD),
    },
    {
      icon: <Icon icon="Logout" color="textColor.main" width="20px" />,
      text: 'Logout',
      onClick: logout,
    },
  ];

  const { data: currentUser, isValidating: isValidatingUser } = useCurrentUser();

  const handleClickLoginButton = () => {
    login();
  };

  return (
    <Component
      currentUser={currentUser}
      isValidating={isValidatingUser}
      onClickLoginButton={handleClickLoginButton}
      menuItems={menuItems}
      logoImagePath={IMAGE_PATH.LOGO}
    />
  );
});
