import { ComponentProps, memo, VFC, useState } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';
import { Drawer as MuiDrawer } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, SideBarListItem, Icon, Link, IconButton } from '~/components/parts/commons';
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

const drawerWidth = 280;

export const Component: VFC<Props> = memo(({ currentUser, asPath }) => {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Box width="100%" bgcolor="whitesmoke" display="flex" alignItems="center" justifyContent={open ? 'flex-end' : 'center'}>
        {open ? (
          <IconButton icon="ChevronLeft" width={30} onClick={handleDrawerClose} />
        ) : (
          <IconButton icon="ChevronRight" width={30} onClick={handleDrawerOpen} />
        )}
      </Box>
      <StyledSideBarWrapper width="280px" minHeight="100vh" p="16px" bgcolor="whitesmoke">
        {open ? (
          <StyledUserIconWrapper pb="16px">
            <UserIcon size={80} imagePath={currentUser?.image} userId={currentUser?._id} isLink />
            <Typography variant="h3">{currentUser?.name}</Typography>
          </StyledUserIconWrapper>
        ) : (
          <StyledUserIconWrapper width="fit-content" pb="16px">
            <UserIcon size={40} imagePath={currentUser?.image} userId={currentUser?._id} isLink />
          </StyledUserIconWrapper>
        )}
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
    </StyledDrawer>
  );
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const StyledDrawer = styled(MuiDrawer)<{ open: boolean }>`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  white-space: nowrap;
  box-sizing: border-box;
  ${(props) =>
    props.open && {
      ...openedMixin(props.theme),
      '& .MuiDrawer-paper': openedMixin(props.theme),
    }}
  ${(props) =>
    !props.open && {
      ...closedMixin(props.theme),
      '& .MuiDrawer-paper': closedMixin(props.theme),
    }}
`;

const StyledSideBarWrapper = styled(Box)`
  box-sizing: border-box;
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
