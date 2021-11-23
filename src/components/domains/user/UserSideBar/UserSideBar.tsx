import { ComponentProps, memo, VFC, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, Icon } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { SideBar } from '~/components/parts/layout/SideBar';

import { User } from '~/domains';

import { URLS } from '~/constants/urls';

import { useSignedUrl } from '~/stores/attachment/useSignedUrl';

type Props = {
  currentUser?: User;
  asPath: string;
  isValidating?: boolean;
};

const sidebarItems: {
  icon: ComponentProps<typeof Icon>['icon'];
  url: string;
  text: string;
}[] = [
  {
    icon: 'DashboardOutlined',
    url: URLS.DASHBOARD,
    text: 'ホーム',
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

export const Component: VFC<Props> = memo(({ currentUser, asPath, isValidating = false }) => {
  const { data: signedUrl } = useSignedUrl(currentUser?.iconImageId);

  const openContent = useMemo(() => {
    if (isValidating) {
      return (
        <StyledUserIconWrapper pb="16px">
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width="100px" />
        </StyledUserIconWrapper>
      );
    }

    if (currentUser) {
      return (
        <StyledUserIconWrapper pb="16px">
          <UserIcon size={80} signedUrl={signedUrl} userId={currentUser._id} isLink />
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
  }, [isValidating, currentUser, signedUrl]);

  const closeContent = useMemo(() => {
    if (isValidating) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <Skeleton variant="circular" width={40} height={40} />
        </StyledUserIconWrapper>
      );
    }

    if (currentUser) {
      return (
        <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
          <UserIcon size={40} signedUrl={signedUrl} userId={currentUser._id} isLink />
        </StyledUserIconWrapper>
      );
    }

    return (
      <StyledUserIconWrapper width="fit-content" pb="16px" pt="46px">
        <Icon width={40} icon="PersonOutline" />
      </StyledUserIconWrapper>
    );
  }, [isValidating, currentUser, signedUrl]);

  return <SideBar asPath={asPath} currentUser={currentUser} openContent={openContent} closeContent={closeContent} sidebarItems={sidebarItems} />;
});

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

export const UserSideBar: VFC = memo(() => {
  const router = useRouter();
  const { data: currentUser, isValidating: isValidatingUser } = useCurrentUser();

  return <Component currentUser={currentUser} asPath={router.asPath} isValidating={isValidatingUser} />;
});
