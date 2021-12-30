import { ComponentProps, memo, VFC, useState } from 'react';

import { Box } from '@mui/system';
import { Drawer as MuiDrawer } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { SideBarListItem, Icon, Link } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';

import { useLocalStorage } from '~/hooks/useLocalStorage';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

type Props = {
  openContent: JSX.Element;
  closeContent: JSX.Element;
  sidebarItems: {
    icon: ComponentProps<typeof Icon>['icon'];
    url: string;
    text: string;
  }[];
};

const drawerWidth = 280;
const isOpenSideBar = 'isOpenSideBar';

export const SideBar: VFC<Props> = memo(({ sidebarItems, openContent, closeContent }) => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const { fetchData, storeData } = useLocalStorage();
  const value = fetchData<boolean>(isOpenSideBar);
  const [open, setOpen] = useState(value ?? true);

  const handleClickChevronButton = () => {
    setOpen((prevState) => {
      storeData<boolean>(isOpenSideBar, !prevState);
      return !prevState;
    });
  };

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Box
        mt="8px"
        position="absolute"
        width="100%"
        bgcolor="whitesmoke"
        display="flex"
        alignItems="center"
        justifyContent={open ? 'flex-end' : 'center'}
      >
        <button className="btn" onClick={handleClickChevronButton}>
          <Icon icon={open ? 'CHEVRON_LEFT' : 'CHEVRON_RIGHT'} size={24} />
        </button>
      </Box>
      <StyledSideBarWrapper width="280px" p="16px" bgcolor="whitesmoke" height="100%" display="flex" flexDirection="column">
        {open ? openContent : closeContent}
        <Box p="12px 0 24px" display="flex" flexDirection="column" gap="8px">
          {sidebarItems.map((sidebarItem, index) => {
            if (open) {
              return (
                <Link href={sidebarItem.url} key={index}>
                  <SideBarListItem
                    icon={<Icon icon={sidebarItem.icon} size={20} color={sidebarItem.url === router.asPath ? 'WHITE' : 'BLACK'} />}
                    selected={sidebarItem.url === router.asPath}
                  >
                    <span className={sidebarItem.url === router.asPath ? 'text-white' : 'text-black'}>{sidebarItem.text}</span>
                  </SideBarListItem>
                </Link>
              );
            }
            return (
              <Link href={sidebarItem.url} key={index}>
                <Box width="40px" display="flex" alignItems="center" flexDirection="column" justifyContent="center">
                  <Icon icon={sidebarItem.icon} size={24} color={sidebarItem.url === router.asPath ? 'PRIMARY' : 'BLACK'} />
                  <span className={`fs-4 fw-bold ${sidebarItem.url === router.asPath ? 'text-primary' : 'text-black'}`}>
                    {sidebarItem.text}
                  </span>
                </Box>
              </Link>
            );
          })}
        </Box>
        {currentUser && (
          <Box mt="auto">
            <Box display="flex" alignItems="center" gap="8px">
              <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} />
              {open && <span>{currentUser.name}</span>}
            </Box>
          </Box>
        )}
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

  .MuiDrawer-paper {
    top: 56px;
    background-color: whitesmoke;
  }
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

  /*
   * モバイルではサイドバーを表示しない
   */
  @media (max-width:  ${({ theme }) => theme.breakpoints.values.sm}px) {
    display: none;
  }
`;

const StyledSideBarWrapper = styled(Box)`
  box-sizing: border-box;
  border-right: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;
