import { ComponentProps, memo, VFC } from 'react';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, SideBarListItem, Icon, Link } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';

import { User } from '~/domains';

import { URLS } from '~/constants/urls';

type Props = {
  currentUser?: User;
  asPath: string;
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

export const Component: VFC<Props> = memo(({ currentUser, asPath }) => {
  return (
    <StyledSideBarWrapper width="280px" minHeight="100vh" p="16px">
      <StyledUserIconWrapper pb="16px">
        <UserIcon size="large" imagePath={currentUser?.image} userId={currentUser?._id} isLink />
        <Typography variant="h3">{currentUser?.name}</Typography>
      </StyledUserIconWrapper>
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
  background-color: #fff;
  border-right: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

export const SideBar: VFC = memo(() => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  return <Component currentUser={currentUser} asPath={router.asPath} />;
});
