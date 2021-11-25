import React, { useState, MouseEvent, ReactNode, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';

import { Timeline } from '@mui/lab';
import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';
import { useStoryForUpdate, useStoryForDelete } from '~/stores/story';

import { Button, Emoji, Icon, TimeLineItem, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { useStory } from '~/stores/story/useStory';
import { Menu } from '~/components/parts/commons/Menu';
import { IconButton } from '~/components/parts/commons/IconButton';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { COLORS } from '~/constants';
import { TeamDashboardLayout } from '~/components/parts/layout/TeamDashboardLayout';
import { useIsOpenCreateNewStoryPostModal } from '~/stores/modal/useIsOpenCreateNewStoryPostModal';
import { useStoryPosts } from '~/stores/storyPost';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { GuestUserIcon } from '~/components/domains/user/UserIcon/UserIcon';

type Props = {
  storyFromServerSide?: Story;
};

const StoryPage: ProecoNextPage<Props> = ({ storyFromServerSide }) => {
  const router = useRouter();

  const { storyId } = router.query;
  const { data: story } = useStory(storyId as string, storyFromServerSide);
  const { data: currentUser } = useCurrentUser();

  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: storyPosts } = useStoryPosts({
    storyId: storyId as string,
    page: page,
    limit: 10,
  });

  const timeLineItems = useMemo(() => {
    if (!storyPosts) {
      return [];
    }
    return storyPosts.docs.map((storyPost) => {
      return {
        content: storyPost.content,
        // TODO fix image
        iconImageId: currentUser?.iconImageId || '',
        createdUserId: storyPost.createdUserId || '',
        // TODO: Childrenの中身を作成する
        children: <Box minHeight="250px"></Box>,
      };
    });
  }, [storyPosts, currentUser]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const { mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { mutate: mutateStoryForDelete } = useStoryForDelete();

  const { mutate: mutateIsOpenCreateNewStoryPostModal } = useIsOpenCreateNewStoryPostModal();

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpdate = () => {
    if (!story) return;
    mutateIsOpenUpdateStoryModal(true);
    mutateStoryForUpdate(story);
    handleClose();
  };

  const handleClickDelete = () => {
    if (!story) return;
    mutateIsOpenDeleteStoryModal(true);
    mutateStoryForDelete(story);
  };

  const handleClickCreateStoryPostButton = () => {
    mutateIsOpenCreateNewStoryPostModal(true);
  };

  const menuItems = [
    {
      icon: <Icon icon="Update" width="20px" color="textColor.main" />,
      text: '更新する',
      onClick: handleClickUpdate,
    },
    {
      icon: <Icon icon="Delete" width="20px" color={COLORS.ERROR} />,
      text: '削除する',
      onClick: handleClickDelete,
    },
  ];

  if (!story) {
    return null;
  }

  return (
    <>
      <ProecoOgpHead title={story.title} />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={4} display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="16px">
            <Emoji emojiId={story.emojiId} size={40} />
            <Typography variant="h2" bold>
              {story.title}
            </Typography>
          </Box>
          <IconButton icon="MoreVert" width={24} onClick={(e) => handleClickMenu(e)} />
          <Menu onClick={(e) => e.stopPropagation()} anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
        </Box>
        <Box my={4} maxWidth="600px" mx="auto">
          <StyledTimeline>
            {timeLineItems.map((item, i) => (
              <TimeLineItem key={i} iconImageId={item.iconImageId} userId={item.createdUserId}>
                {item.children}
              </TimeLineItem>
            ))}
          </StyledTimeline>
          <Box display="flex" alignItems="top" justifyContent="space-between" gap={0.5}>
            {currentUser ? <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} /> : <GuestUserIcon size={40} />}
            <StyledBoxWrapper width="100%" position="relative">
              <StyledTriangle></StyledTriangle>
              <StyledBox p={5}>
                <Button variant="text" onClick={handleClickCreateStoryPostButton}>
                  ポストを作成する
                </Button>
              </StyledBox>
            </StyledBoxWrapper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const StyledBoxWrapper = styled(Box)`
  filter: drop-shadow(1px 1px 10px rgb(0 0 0 / 25%));
`;

const StyledBox = styled(Box)`
  background: white;
  box-shadow: 1px 1px 10px rgb(0 0 0 / 25%);
  border-radius: 4px;
  margin-left: 10px;
  text-align: center;
`;

const StyledTriangle = styled('div')`
  position: absolute;
  top: 14px;
  left: 0;
  z-index: 2;
  border-top: 6px solid transparent;
  border-right: 12px solid white;
  border-bottom: 6px solid transparent;
`;

const StyledTimeline = styled(Timeline)`
  &.MuiTimeline-root {
    padding: 0;
    margin: 0;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const { data: story } = await restClient.apiGet(`/stories/${id}`);
    return { props: { storyFromServerSide: story } };
  } catch (error) {
    return { props: {} };
  }
};

const getLayout = (page: ReactNode) => <TeamDashboardLayout>{page}</TeamDashboardLayout>;
StoryPage.getLayout = getLayout;

export default StoryPage;
