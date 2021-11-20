import { ComponentProps, memo, VFC, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';

import { Skeleton } from '@mui/material';
import { Typography, Icon } from '~/components/parts/commons';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { UserIconGroup } from '~/components/domains/user/UserIconGroup';

import { Team, User } from '~/domains';

import { URLS } from '~/constants/urls';
import { useTeam, useTeamUsers } from '~/stores/team';
import { SideBar } from '~/components/parts/layout/SideBar';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useAuth } from '~/hooks/useAuth/useAuth';

type Props = {
  currentTeam?: Team;
  asPath: string;
  isValidating: boolean;
  teamUsers: User[];
  teamId?: string;
  currentUser?: User;
  menuItems?: {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }[];
};

export const Component: VFC<Props> = memo(({ asPath, teamUsers, currentTeam, isValidating, teamId, currentUser, menuItems }) => {
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
          <TeamIcon team={currentTeam} size={80} />
          <Typography variant="h3" maximum_lines={1}>
            {currentTeam.name}
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
  }, [isValidating, currentTeam]);

  const openContent = useMemo(() => {
    return (
      <>
        <Box display="flex" flexDirection="column" alignItems="center" pt="4px">
          {TeamContent}
        </Box>
        <Box py="8px" borderBottom="1px solid #eaecf1">
          <UserIconGroup users={teamUsers} isLink />
        </Box>
      </>
    );
  }, [TeamContent, teamUsers]);

  const closeContent = useMemo(() => {
    if (isValidating) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <Skeleton variant="circular" width={40} height={40} />
        </StyledUserIconWrapper>
      );
    }

    if (currentTeam) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <TeamIcon size={40} team={currentTeam} />
        </StyledUserIconWrapper>
      );
    }

    return (
      <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
        <Icon width={40} icon="Group" />
      </StyledUserIconWrapper>
    );
  }, [isValidating, currentTeam]);

  return (
    <SideBar asPath={asPath} openContent={openContent} closeContent={closeContent} sidebarItems={sidebarItems} currentUser={currentUser} menuItems={menuItems} />
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
  const { logout } = useAuth();

  const { data: currentTeam, isValidating: isValidatingTeam } = useTeam({
    teamId: router.query.teamId as string,
  });

  const { data: teamUser = [] } = useTeamUsers({
    teamId: currentTeam?._id,
  });

  const menuItems = [
    {
      icon: <Icon icon="Logout" color="textColor.main" width="20px" />,
      text: 'Logout',
      onClick: () => logout(),
    },
  ];

  return (
    <Component
      asPath={router.asPath}
      currentTeam={currentTeam}
      isValidating={isValidatingTeam}
      teamUsers={teamUser}
      teamId={router.query.teamId as string}
      currentUser={currentUser}
      menuItems={menuItems}
    />
  );
});
