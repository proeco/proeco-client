import { ComponentProps, memo, VFC, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';

import { Skeleton } from '@mui/material';
import { Typography, Icon } from '~/components/parts/commons';
import { SkeltonTeamIcon, TeamIcon } from '~/components/domains/team/TeamIcon';
import { UserIconGroup } from '~/components/domains/user/UserIconGroup';

import { URLS } from '~/constants/urls';
import { useTeam, useTeamUsers } from '~/stores/team';
import { SideBar } from '~/components/parts/layout/SideBar';

export const TeamSideBar: VFC<{ teamId: string }> = memo(({ teamId }) => {
  const router = useRouter();

  const { data: currentTeam } = useTeam({ teamId });

  const { data: teamUsers = [], isValidating } = useTeamUsers({
    teamId: currentTeam?._id,
  });

  const teamUsersInfo = teamUsers.map((teamUser) => {
    return { userId: teamUser._id, name: teamUser.name, attachmentId: teamUser.iconImageId };
  });

  const menuItems = [
    {
      icon: <Icon icon="Logout" color="textColor.main" width="20px" />,
      text: '個人画面に戻る',
      onClick: () => router.push(URLS.DASHBOARD),
    },
  ];
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

    if (currentTeam) {
      return (
        <>
          <TeamIcon attachmentId={currentTeam.iconImageId} size={80} />
          <Typography variant="h3" maximum_lines={1}>
            {currentTeam.name}
          </Typography>
        </>
      );
    }
  }, [isValidating, currentTeam]);

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
          <SkeltonTeamIcon size={40} />
        </StyledUserIconWrapper>
      );
    }

    if (currentTeam) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <TeamIcon size={40} attachmentId={currentTeam.iconImageId} />
        </StyledUserIconWrapper>
      );
    }

    return (
      <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
        <Icon width={40} icon="Group" />
      </StyledUserIconWrapper>
    );
  }, [currentTeam, isValidating]);

  return <SideBar openContent={openContent} closeContent={closeContent} sidebarItems={sidebarItems} menuItems={menuItems} />;
});

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;
