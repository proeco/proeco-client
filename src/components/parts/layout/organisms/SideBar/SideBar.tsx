import { memo, VFC } from 'react';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, SideBarListItem, Icon, Emoji, Button, Link } from '~/components/parts/commons/atoms';
import { IconButton } from '~/components/parts/commons/organisms/IconButton';
import { UserIcon } from '~/components/domains/user/atoms';

import { Story, User } from '~/domains';

import { URLS } from '~/constants/urls';
import { useStoriesForSideBar } from '~/stores/story';

type Props = {
  currentUser?: User;
  openCreateStoryModal: () => void;
  storiesData: { totalDocs: number; stories: Story[] };
  asPath: string;
};

const DISPLAY_STORY_COUNT = 3;

export const Component: VFC<Props> = memo(({ currentUser, openCreateStoryModal, storiesData, asPath }) => {
  return (
    <StyledSideBarWrapper width="280px" minHeight="100vh" p="16px">
      <StyledUserIconWrapper pb="16px">
        <UserIcon size="large" imagePath={currentUser?.image} userId={currentUser?._id} isLink />
        <Typography variant="h3">{currentUser?.name}</Typography>
      </StyledUserIconWrapper>
      <Box p="12px 0 24px">
        <Link href={URLS.DASHBOARD}>
          <SideBarListItem
            icon={<Icon icon="DashboardOutlined" width="20px" color={URLS.DASHBOARD === asPath ? '#fff' : 'textColor.main'} />}
            selected={URLS.DASHBOARD === asPath}
          >
            <Typography variant="body1">ダッシュボード</Typography>
          </SideBarListItem>
        </Link>
      </Box>
      <Box display="flex" width="100%" pb="8px" alignItems="center" justifyContent="space-between">
        <StyledTypography variant="body1">ストーリー</StyledTypography>
        <StyledIconButton icon="Add" width={18} aria-label="open" size="small" onClick={openCreateStoryModal} />
      </Box>
      <Box pb="12px">
        {storiesData.stories.map((story) => (
          <Link key={story._id} href={`/story/${story._id}`}>
            <SideBarListItem icon={<Emoji emojiId={story.emojiId} size={20} />} selected={`/story/${story._id}` === asPath}>
              <Typography variant="body1">{story.title}</Typography>
            </SideBarListItem>
          </Link>
        ))}
      </Box>
      {storiesData.totalDocs > DISPLAY_STORY_COUNT && (
        <Link href="/story">
          <StyledButton variant="contained">もっと見る</StyledButton>
        </Link>
      )}
    </StyledSideBarWrapper>
  );
});

const StyledSideBarWrapper = styled(Box)`
  box-sizing: border-box;
  background-color: #fff;
  border-right: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

const StyledTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.textColor.light};
`;

const StyledIconButton = styled(IconButton)`
  color: ${(props) => props.theme.palette.textColor.light};
  margin-right: 8px;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
  display: block;
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

  const { data: storiesData } = useStoriesForSideBar({
    userId: currentUser?._id,
    page: 1,
    limit: 3,
  });

  const { mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const openCreateStoryModal = () => {
    mutateIsOpenCreateNewStoryModal(true);
  };

  return (
    <Component
      currentUser={currentUser}
      openCreateStoryModal={openCreateStoryModal}
      storiesData={storiesData ? storiesData : { totalDocs: 0, stories: [] }}
      asPath={router.asPath}
    />
  );
});
