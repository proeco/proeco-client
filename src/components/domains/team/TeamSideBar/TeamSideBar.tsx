import { ComponentProps, memo, VFC, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';

import { Skeleton } from '@mui/material';
import { Typography, Icon } from '~/components/parts/commons';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { UserIconGroup } from '~/components/domains/user/UserIconGroup';

import { URLS } from '~/constants/urls';
import { useTeam, useTeamUsers } from '~/stores/team';
import { SideBar } from '~/components/parts/layout/SideBar';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useSignedUrls } from '~/stores/attachment/useSignedUrls';
import { useSignedUrl } from '~/stores/attachment/useSignedUrl';

type Props = {
  currentTeamInfo?: {
    name: string;
    signedUrl?: string;
  };
  asPath: string;
  isValidating: boolean;
  teamUsersInfo: {
    userId: string;
    name: string;
    signedUrl: string;
  }[];
  currentUserInfo?: {
    userId: string;
    name: string;
    signedUrl?: string;
  };
  teamId?: string;
  menuItems?: {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }[];
};

export const Component: VFC<Props> = memo(({ asPath, teamUsersInfo, currentTeamInfo, isValidating, currentUserInfo, teamId, menuItems }) => {
  const sidebarItems: {
    icon: ComponentProps<typeof Icon>['icon'];
    url: string;
    text: string;
  }[] = useMemo(
    () => [
      {
        icon: 'DashboardOutlined',
        url: URLS.TEAMS_DASHBOARD(teamId as string),
        text: 'ホーム',
      },
      {
        icon: 'HistoryEdu',
        url: URLS.TEAMS_DASHBOARD_STORIES(teamId as string),
        text: 'ストーリー',
      },
      {
        icon: 'Settings',
        url: URLS.TEAMS_DASHBOARD_SETTING(teamId as string),
        text: '設定',
      },
    ],
    [teamId],
  );

  const TeamContent = useMemo(() => {
    if (isValidating) {
      return (
        <>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width="100px" />
        </>
      );
    }

    if (currentTeamInfo) {
      return (
        <>
          <TeamIcon teamName={currentTeamInfo.name} signedUrl={currentTeamInfo.signedUrl} size={80} />
          <Typography variant="h3" maximum_lines={1}>
            {currentTeamInfo.name}
          </Typography>
        </>
      );
    }

    return (
      <>
        <Icon width={40} icon="Group" />
        <Typography variant="h3">undefined</Typography>
      </>
    );
  }, [isValidating, currentTeamInfo]);

  const openContent = useMemo(() => {
    return (
      <>
        <Box display="flex" flexDirection="column" alignItems="center" pt="4px">
          {TeamContent}
        </Box>
        <Box py="8px" borderBottom="1px solid #eaecf1">
          <UserIconGroup usersInfo={teamUsersInfo} isLink />
        </Box>
      </>
    );
  }, [TeamContent, teamUsersInfo]);

  const closeContent = useMemo(() => {
    if (isValidating) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <Skeleton variant="circular" width={40} height={40} />
        </StyledUserIconWrapper>
      );
    }

    if (currentTeamInfo) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <TeamIcon size={40} teamName={currentTeamInfo.name} signedUrl={currentTeamInfo.signedUrl} />
        </StyledUserIconWrapper>
      );
    }

    return (
      <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
        <Icon width={40} icon="Group" />
      </StyledUserIconWrapper>
    );
  }, [isValidating, currentTeamInfo]);

  return (
    <SideBar
      asPath={asPath}
      openContent={openContent}
      closeContent={closeContent}
      currentUserInfo={currentUserInfo}
      sidebarItems={sidebarItems}
      menuItems={menuItems}
    />
  );
});

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

export const TeamSideBar: VFC = memo(() => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();

  const { data: signedUrl } = useSignedUrl(currentUser?.iconImageId);
  const currentUserInfo = currentUser ? { userId: currentUser._id, name: currentUser.name, signedUrl } : undefined;

  const { data: currentTeam, isValidating: isValidatingTeam } = useTeam({
    teamId: router.query.teamId as string,
  });
  const { data: teamSignedUrl } = useSignedUrl(currentTeam?.iconImageId);

  const currentTeamInfo = currentTeam ? { name: currentTeam.name, signedUrl: teamSignedUrl } : undefined;

  const { data: teamUsers = [] } = useTeamUsers({
    teamId: currentTeam?._id,
  });

  const iconImageIds = teamUsers.map((teamUser) => {
    return teamUser.iconImageId;
  });

  const { data: userSignedUrls = [] } = useSignedUrls(iconImageIds);

  const teamUsersInfo = teamUsers.map((teamUser, i) => {
    return { userId: teamUser._id, name: teamUser.name, signedUrl: userSignedUrls[i] };
  });

  const menuItems = [
    {
      icon: <Icon icon="Logout" color="textColor.main" width="20px" />,
      text: '個人画面に戻る',
      onClick: () => router.push(URLS.DASHBOARD),
    },
  ];

  return (
    <Component
      asPath={router.asPath}
      currentTeamInfo={currentTeamInfo}
      isValidating={isValidatingTeam}
      teamUsersInfo={teamUsersInfo}
      teamId={router.query.teamId as string}
      menuItems={menuItems}
      currentUserInfo={currentUserInfo}
    />
  );
});
