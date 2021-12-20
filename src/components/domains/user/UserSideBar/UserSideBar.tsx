import React, { ComponentProps, memo, VFC, useMemo } from 'react';

import { Box } from '@mui/system';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, Icon } from '~/components/parts/commons';
import { SkeltonUserIcon, UserIcon } from '~/components/domains/user/UserIcon';
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
    icon: 'Group',
    url: URLS.DASHBOARD_TEAMS,
    text: 'チーム',
  },
  {
    icon: 'Settings',
    url: URLS.DASHBOARD_SETTINGS,
    text: '設定',
  },
];

export const UserSideBar: VFC = memo(() => {
  const { data: currentUser, isValidating: isValidatingUser } = useCurrentUser();

  const openContent = useMemo(() => {
    if (isValidatingUser) {
      return (
        <StyledUserIconWrapper pb="16px">
          <SkeltonUserIcon size={80} />
          <Skeleton variant="text" width="100px" />
        </StyledUserIconWrapper>
      );
    }

    if (currentUser) {
      return (
        <StyledUserIconWrapper pb="16px">
          <UserIcon size={80} attachmentId={currentUser.iconImageId} userId={currentUser._id} isLink />
          <Typography variant="h3">{currentUser.name}</Typography>
        </StyledUserIconWrapper>
      );
    }

    return (
      <StyledUserIconWrapper pb="16px">
        <Icon width={40} icon="PersonOutline" />
        <Typography variant="h3">undefined</Typography>
      </StyledUserIconWrapper>
    );
  }, [isValidatingUser, currentUser]);

  const closeContent = useMemo(() => {
    if (isValidatingUser) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <SkeltonUserIcon size={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </StyledUserIconWrapper>
      );
    }

    if (currentUser) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} isLink />
        </StyledUserIconWrapper>
      );
    }

    return (
      <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
        <Icon width={40} icon="PersonOutline" />
      </StyledUserIconWrapper>
    );
  }, [currentUser, isValidatingUser]);

  return <SideBar openContent={openContent} closeContent={closeContent} sidebarItems={sidebarItems} />;
});

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;
