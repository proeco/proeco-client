import React, { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';

import { ListItemIcon, MenuItem } from '@mui/material';
import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';
import { useStoryForUpdate, useStoryForDelete } from '~/stores/story';

import { Emoji, Icon, TimeLineItem, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { useStory } from '~/stores/story/useStory';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { COLORS } from '~/constants';
import { TeamDashboardLayout } from '~/components/parts/layout/TeamDashboardLayout';
import { useStoryPosts } from '~/stores/storyPost';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { CreateNewStoryPostPaper } from '~/components/domains/storyPost/CreateNewStoryPostPaper/CreateNewStoryPostPaper';
import { Dropdown } from '~/components/parts/commons/Dropdown';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { DisplayStoryPostPaper } from '~/components/domains/storyPost/DisplayStoryPostPaper';

type Props = {
  storyFromServerSide?: Story;
};

const StoryPage: ProecoNextPage<Props> = ({ storyFromServerSide }) => {
  const router = useRouter();

  const { storyId } = router.query;

  const currentStoryId = storyId as string;

  const { data: story } = useStory(currentStoryId, storyFromServerSide);
  const { data: currentUser } = useCurrentUser();

  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: storyPosts } = useStoryPosts({
    storyId: currentStoryId,
    page,
    limit: 10,
  });

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const { mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { mutate: mutateStoryForDelete } = useStoryForDelete();

  const handleClickUpdate = () => {
    if (!story) return;
    mutateIsOpenUpdateStoryModal(true);
    mutateStoryForUpdate(story);
  };

  const handleClickDelete = () => {
    if (!story) return;
    mutateIsOpenDeleteStoryModal(true);
    mutateStoryForDelete(story);
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

  if (!story || !storyPosts || !currentUser) {
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
          <Dropdown
            toggle={<Icon icon="MoreVert" width={24} />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {menuItems.map((menuItem, i) => (
              <MenuItem key={i} onClick={menuItem.onClick}>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                {menuItem.text}
              </MenuItem>
            ))}
          </Dropdown>
        </Box>
        <Box my={4} maxWidth="600px" mx="auto">
          {storyPosts.docs.map((storyPost) => {
            return (
              <TimeLineItem key={storyPost._id} userAttachmentId={currentUser.iconImageId} userId={storyPost.createdUserId}>
                <DisplayStoryPostPaper currentUser={currentUser} storyPost={storyPost} storyId={currentStoryId} page={page} />
              </TimeLineItem>
            );
          })}
          {currentUser && (
            <Box display="flex" alignItems="top" justifyContent="space-between" gap={1}>
              <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} />
              <Box width="100%">
                <CreateNewStoryPostPaper storyId={currentStoryId} page={page} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

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
