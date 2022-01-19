import Image from 'next/image';
import { memo, VFC, useState, useMemo } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import { signOut } from 'next-auth/react';
import { Dropdown, DropdownItem } from '~/components/parts/commons/Dropdown';

import { Button, Icon, Link } from '~/components/parts/commons';
import { UserIcon, SkeltonUserIcon } from '~/components/domains/user/UserIcon';
import { LoginModal } from '~/components/parts/authentication/LoginModal';

import { IMAGE_PATH, URLS } from '~/constants';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeamsRelatedUser } from '~/stores/team';
import { TeamIcon } from '~/components/domains/team/TeamIcon';

export const NavigationBar: VFC = memo(() => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const { data: currentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();
  const { data: teams = [] } = useTeamsRelatedUser({ userId: currentUser?._id });

  const menuItems = useMemo(
    () => [
      {
        icon: <Icon icon="HOME" size={20} />,
        text: 'ホーム',
        onClick: () => router.push(URLS.DASHBOARD_TEAMS),
      },
      {
        icon: <Icon icon="GEAR" size={20} />,
        text: '個人設定',
        onClick: () => router.push(URLS.DASHBOARD_SETTINGS),
      },
      {
        icon: <Icon icon="REPLY" size={20} />,
        text: 'ログアウト',
        onClick: () => signOut(),
      },
    ],
    [router],
  );

  const Contents = useMemo(() => {
    if (isValidatingCurrentUser) return <SkeltonUserIcon size={40} />;

    if (currentUser) {
      return (
        <div className="d-flex align-items-center gap-3">
          {teams.length !== 0 && (
            <Dropdown
              toggle={
                <div className="d-flex flex-column text-white fs-4 align-items-center">
                  <Icon size={24} icon="COLUMN" color="WHITE" />
                  プロダクト
                </div>
              }
              tag="div"
            >
              {teams.map((team, i) => (
                <Link key={i} href={`/${team.productId}`}>
                  <DropdownItem>
                    <TeamIcon attachmentId={team.iconImageId} size={28} />
                    <span className="ms-2">{team.name}</span>
                  </DropdownItem>
                </Link>
              ))}
              <DropdownItem divider />
              <Link href={URLS.DASHBOARD_TEAMS_NEW}>
                <DropdownItem>新規プロダクトを作成する</DropdownItem>
              </Link>
            </Dropdown>
          )}
          <Dropdown toggle={<UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser?._id} />} tag="div">
            {menuItems.map((menuItem, i) => (
              <DropdownItem key={i} onClick={menuItem.onClick}>
                {menuItem.icon}
                <span className="ms-2">{menuItem.text}</span>
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      );
    }

    return (
      <Button color="orange" onClick={() => setIsLoginModalOpen(true)}>
        ログイン
      </Button>
    );
  }, [isValidatingCurrentUser, currentUser, teams, menuItems]);

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
