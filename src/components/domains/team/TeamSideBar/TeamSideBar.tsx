import { ComponentProps, memo, useMemo, VFC } from 'react';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';

import { Skeleton } from '@mui/material';
import { Typography, SideBarListItem, Icon, Link } from '~/components/parts/commons';
import { TeamIcon } from '~/components/domains/team/TeamIcon';

import { Team, User } from '~/domains';

import { URLS } from '~/constants/urls';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeams } from '~/stores/team';

type Props = {
  currentUser?: User;
  currentTeam?: Team;
  asPath: string;
  isValidating: boolean;
};

const sidebarItems: {
  icon: ComponentProps<typeof Icon>['icon'];
  url: string;
  text: string;
}[] = [
  {
    icon: 'DashboardOutlined',
    url: URLS.DASHBOARD,
    text: 'ダッシュボード',
  },
  {
    icon: 'HistoryEdu',
    url: URLS.DASHBOARD_TEAMS,
    text: 'ストーリー',
  },
  {
    icon: 'Settings',
    url: URLS.DASHBOARD_SETTINGS,
    text: '設定',
  },
];

export const Component: VFC<Props> = memo(({ asPath, currentTeam, isValidating }) => {
  const TeamContent = useMemo(() => {
    if (isValidating) {
      return (
        <Box>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width="100px" />
        </Box>
      );
    }

    if (currentTeam) {
      return (
        <Box>
          <TeamIcon team={currentTeam} size={80} />
          <Typography variant="h3" maximum_lines={1}>
            {currentTeam.name}
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        <Icon width={40} icon="Group" />
        <Typography variant="h3">undefined</Typography>
      </Box>
    );
  }, [isValidating, currentTeam]);

  return (
    <StyledSideBarWrapper width="280px" minHeight="100vh" p="16px" bgcolor="whitesmoke">
      {TeamContent}
      <Box p="12px 0 24px" display="flex" flexDirection="column" gap="8px">
        {sidebarItems.map((sidebarItem, index) => {
          return (
            <Link href={sidebarItem.url} key={index}>
              <SideBarListItem
                icon={<Icon icon={sidebarItem.icon} width="20px" color={sidebarItem.url === asPath ? '#fff' : 'textColor.main'} />}
                selected={sidebarItem.url === asPath}
              >
                <Typography variant="body1">{sidebarItem.text}</Typography>
              </SideBarListItem>
            </Link>
          );
        })}
      </Box>
    </StyledSideBarWrapper>
  );
});

const StyledSideBarWrapper = styled(Box)`
  box-sizing: border-box;
  border-right: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

export const TeamSideBar: VFC = memo(() => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { data: teams, isValidating: isValidatingTeams } = useTeams({
    userId: currentUser?._id,
  });

  const currentTeam = teams?.find((team) => team._id === router.query.id);

  return <Component asPath={router.asPath} currentTeam={currentTeam} isValidating={isValidatingTeams} />;
});
