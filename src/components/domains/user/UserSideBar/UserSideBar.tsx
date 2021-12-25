import React, { ComponentProps, memo, VFC, useMemo } from 'react';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { User } from '~/domains';

import { Icon } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { SideBar } from '~/components/parts/layout/SideBar';

import { URLS } from '~/constants/urls';

const sidebarItems: {
  icon: ComponentProps<typeof Icon>['icon'];
  url: string;
  text: string;
}[] = [
  // {
  //   icon: 'DashboardOutlined',
  //   url: URLS.DASHBOARD,
  //   text: 'ホーム',
  // },
  {
    icon: 'PEOPLE',
    url: URLS.DASHBOARD_TEAMS,
    text: 'チーム',
  },
  {
    icon: 'GEAR',
    url: URLS.DASHBOARD_SETTINGS,
    text: '設定',
  },
];

export const UserSideBar: VFC<{ currentUser: User }> = memo(({ currentUser }) => {
  const openContent = useMemo(() => {
    return (
      <StyledUserIconWrapper pb="16px">
        <UserIcon size={80} attachmentId={currentUser.iconImageId} userId={currentUser._id} isLink />
        <h2 className="mb-0">{currentUser.name}</h2>
      </StyledUserIconWrapper>
    );
  }, [currentUser._id, currentUser.iconImageId, currentUser.name]);

  const closeContent = useMemo(() => {
    return (
      <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
        <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} isLink />
      </StyledUserIconWrapper>
    );
  }, [currentUser._id, currentUser.iconImageId]);

  return <SideBar openContent={openContent} closeContent={closeContent} sidebarItems={sidebarItems} />;
});

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;
