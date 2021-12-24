import Image from 'next/image';
import { memo, VFC, useState, useMemo, useCallback } from 'react';
import { AppBar, ListItemIcon, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { Dropdown } from '../../commons/Dropdown';

import { Button, Icon, Link } from '~/components/parts/commons';
import { UserIcon, SkeltonUserIcon } from '~/components/domains/user/UserIcon';
import { LoginModal } from '~/components/parts/authentication/LoginModal';

import { IMAGE_PATH, URLS } from '~/constants';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { User } from '~/domains';

export const NavigationBar: VFC = memo(() => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const { data: currentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();

  const menuItems = useCallback(
    (user: User) => [
      {
        icon: <UserIcon size={20} userId={user._id} attachmentId={user.iconImageId} />,
        text: 'ダッシュボード',
        onClick: () => router.push(URLS.DASHBOARD_TEAMS),
      },
      {
        icon: <Icon icon="Logout" color="textColor.main" width="20px" />,
        text: 'Logout',
        onClick: () => router.push(URLS.API_LOGOUT),
      },
    ],
    [router],
  );

  const Contents = useMemo(() => {
    if (isValidatingCurrentUser) return <SkeltonUserIcon size={40} />;

    if (currentUser) {
      return (
        <Dropdown toggle={<StyledUserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser?._id} />}>
          {menuItems(currentUser).map((menuItem, i) => (
            <MenuItem key={i} onClick={menuItem.onClick}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              {menuItem.text}
            </MenuItem>
          ))}
        </Dropdown>
      );
    }

    return (
      <StyledButton color="orange" onClick={() => setIsLoginModalOpen(true)}>
        ログイン
      </StyledButton>
    );
  }, [isValidatingCurrentUser, currentUser, menuItems]);

  return (
    <>
      <StyledAppBar position="sticky">
        <Link href="/">
          <Image src={IMAGE_PATH.LOGO} alt="Proeco Logo" width={195} height={40} />
        </Link>
        {Contents}
      </StyledAppBar>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
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
