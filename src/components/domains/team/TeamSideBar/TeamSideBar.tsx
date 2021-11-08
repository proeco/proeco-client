import { ComponentProps, memo, VFC, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';
import { TeamMenu } from '../TeamMenu';

import { Typography, SideBarListItem, Icon, Link } from '~/components/parts/commons';

import { User } from '~/domains';

import { URLS } from '~/constants/urls';

type Props = {
  currentUser?: User;
  asPath: string;
};

export const Component: VFC<Props> = memo(({ asPath }) => {
  const router = useRouter();
  const { teamId } = router.query;

  const sidebarItems: {
    icon: ComponentProps<typeof Icon>['icon'];
    url: string;
    text: string;
  }[] = useMemo(
    () => [
      {
        icon: 'DashboardOutlined',
        url: URLS.DASHBOARD,
        text: 'ダッシュボード',
      },
      {
        icon: 'HistoryEdu',
        url: URLS.TEAMS_DASHBOARD_STORY(teamId as string),
        text: 'ストーリー',
      },
      {
        icon: 'Settings',
        url: URLS.DASHBOARD_SETTINGS,
        text: '設定',
      },
    ],
    [teamId],
  );

  return (
    <StyledSideBarWrapper width="280px" minHeight="100vh" p="16px" bgcolor="whitesmoke">
      <TeamMenu />
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

  return <Component asPath={router.asPath} />;
});
