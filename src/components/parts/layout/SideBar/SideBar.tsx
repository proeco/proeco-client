import { memo, VFC } from 'react';
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

export const Component: VFC<Props> = memo(({ currentUser, asPath }) => {
  return (
    <StyledSideBarWrapper width="280px" minHeight="100vh" p="16px">
      <StyledUserIconWrapper pb="16px">
        <UserIcon size="large" imagePath={currentUser?.image} userId={currentUser?._id} isLink />
        <Typography variant="h3">{currentUser?.name}</Typography>
      </StyledUserIconWrapper>
      <Box p="12px 0 24px" display="flex" flexDirection="column" gap="8px">
        <Link href={URLS.DASHBOARD}>
          <SideBarListItem
            icon={<Icon icon="DashboardOutlined" width="20px" color={URLS.DASHBOARD === asPath ? '#fff' : 'textColor.main'} />}
            selected={URLS.DASHBOARD === asPath}
          >
            <Typography variant="body1">ダッシュボード</Typography>
          </SideBarListItem>
        </Link>
        <Link href={URLS.DASHBOARD_TEAMS}>
          <SideBarListItem
            icon={<Icon icon="Group" width="20px" color={URLS.DASHBOARD_TEAMS === asPath ? '#fff' : 'textColor.main'} />}
            selected={URLS.DASHBOARD_TEAMS === asPath}
          >
            <Typography variant="body1">チーム</Typography>
          </SideBarListItem>
        </Link>
        <Link href={URLS.DASHBOARD_SETTINGS}>
          <SideBarListItem
            icon={<Icon icon="Settings" width="20px" color={URLS.DASHBOARD_SETTINGS === asPath ? '#fff' : 'textColor.main'} />}
            selected={URLS.DASHBOARD_SETTINGS === asPath}
          >
            <Typography variant="body1">設定</Typography>
          </SideBarListItem>
        </Link>
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
