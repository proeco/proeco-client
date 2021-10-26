import { memo, VFC } from 'react';
import { Box, styled } from '@mui/system';

import { Link } from '@mui/material';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { Typography, SideBarListItem, Icon, Emoji } from '~/components/parts/commons/atoms';
import { IconButton } from '~/components/parts/commons/organisms/IconButton';
import { UserIcon } from '~/components/domains/user/atoms';

import { Story, User } from '~/domains';

import { URLS } from '~/constants/urls';
import { useStories } from '~/stores/story';

type Props = {
  currentUser?: User;
  openCreateStoryModal: () => void;
  docs: Story[];
};

export const Component: VFC<Props> = memo(({ currentUser, openCreateStoryModal, docs }) => {
  return (
    <StyledSideBarWrapper width="280px" height="100vh" p="16px">
      <StyledUserIconWrapper pb="16px">
        <UserIcon size="large" imagePath={currentUser?.image} userId={currentUser?._id} isLink />
        <Typography variant="h3">{currentUser?.name}</Typography>
      </StyledUserIconWrapper>
      <Box p="12px 0 24px">
        <Link href={URLS.DASHBOARD} underline="none">
          <SideBarListItem icon={<Icon icon="DashboardOutlined" width="20px" color="textColor.main" />}>
            <Typography variant="body1">ダッシュボード</Typography>
          </SideBarListItem>
        </Link>
      </Box>
      <Box display="flex" width="100%" pb="12px" alignItems="center" justifyContent="space-between">
        <StyledTypography variant="body1">ストーリー</StyledTypography>
        <StyledIconButton icon="Add" width={18} aria-label="open" size="small" onClick={openCreateStoryModal} />
      </Box>
      <Box>
        {docs.map((story) => (
          <Link key={story._id} href={'/story/' + story._id} underline="none">
            <SideBarListItem icon={<Emoji emojiId={story.emojiId} size={20} />}>
              <Typography variant="body1">{story.title}</Typography>
            </SideBarListItem>
          </Link>
        ))}
      </Box>
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

const StyledUserIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.palette.borderColor.main};
`;

export const SideBar: VFC = memo(() => {
  const { data: currentUser } = useCurrentUser();

  const { data: stories } = useStories({
    userId: currentUser?._id,
    page: 1,
    limit: 10,
  });

  const docs = stories ? stories.docs : [];

  const { mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const openCreateStoryModal = () => {
    mutateIsOpenCreateNewStoryModal(true);
  };
  return <Component currentUser={currentUser} openCreateStoryModal={openCreateStoryModal} docs={docs} />;
});
