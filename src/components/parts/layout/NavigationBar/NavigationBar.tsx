import Image from 'next/image';
import { memo, VFC, useState, useMemo, useCallback } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import { signOut } from 'next-auth/react';
import { Dropdown, DropdownItem } from '~/components/parts/commons/Dropdown';

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
        icon: <Icon icon="REPLY" size={20} />,
        text: 'Logout',
        onClick: () => signOut(),
      },
    ],
    [router],
  );

  const Contents = useMemo(() => {
    if (isValidatingCurrentUser) return <SkeltonUserIcon size={40} />;

    if (currentUser) {
      return (
        <Dropdown toggle={<UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser?._id} />} tag="div">
          {menuItems(currentUser).map((menuItem, i) => (
            <DropdownItem key={i} onClick={menuItem.onClick}>
              {menuItem.icon}
              <span className="ms-2">{menuItem.text}</span>
            </DropdownItem>
          ))}
        </Dropdown>
      );
    }

    return (
      <Button color="orange" onClick={() => setIsLoginModalOpen(true)}>
        ログイン
      </Button>
    );
  }, [isValidatingCurrentUser, currentUser, menuItems]);

  return (
    <>
      <StyledNavbar className="sticky-top navbar bg-primary p-2 shadow">
        <Link href="/">
          <Image className="mb-0" src={IMAGE_PATH.LOGO} alt="Proeco Logo" width={195} height={40} />
        </Link>
        {Contents}
      </StyledNavbar>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
});

const StyledNavbar = styled.div`
  a {
    height: 40px;
  }
`;
