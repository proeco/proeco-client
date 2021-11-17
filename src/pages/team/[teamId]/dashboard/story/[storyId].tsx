import React, { useState, MouseEvent, ReactNode, ComponentProps, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box, styled } from '@mui/system';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';
import { useStoryForUpdate, useStoryForDelete } from '~/stores/story';

import { Button, Emoji, Icon, Paper, TimeLine, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { useStory } from '~/stores/story/useStory';
import { Menu } from '~/components/parts/commons/Menu';
import { IconButton } from '~/components/parts/commons/IconButton';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { COLORS } from '~/constants';
import { TeamDashboardLayout } from '~/components/parts/layout/TeamDashboardLayout';
import { useIsOpenCreateNewStoryTaskModal } from '~/stores/modal/useIsOpenCreateNewStoryTaskModal';
import { useStoryTasks } from '~/stores/storyTask';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useIsOpenDeleteStoryTaskModal } from '~/stores/modal/useIsOpenDeleteStoryTaskModal';
import { useStoryTaskForDelete } from '~/stores/storyTask/useStoryTaskForDelete';

type Props = {
  storyFromServerSide?: Story;
};

const StoryPage: ProecoNextPage<Props> = ({ storyFromServerSide }) => {
  const router = useRouter();

  const { storyId } = router.query;
  const { data: story } = useStory(storyId as string, storyFromServerSide);
  const { data: currentUser } = useCurrentUser();
  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: storyTasks } = useStoryTasks({
    storyId: storyId as string,
    page: page,
    limit: 10,
  });

  const { mutate: mutateIsOpenDeleteStoryTaskModal } = useIsOpenDeleteStoryTaskModal();
  const { mutate: mutateStoryTaskForDelete } = useStoryTaskForDelete();

  const handleClickDeleteStoryTask = (id: string) => {
    const storyTask = storyTasks?.docs.find((storyTask) => storyTask._id === id);
    if (!storyTask) return;
    mutateIsOpenDeleteStoryTaskModal(true);
    mutateStoryTaskForDelete(storyTask);
  };

  const timeLineItems: {
    title: string;
    imagePath?: string;
    name?: string;
    children: ReactNode;
    actions: {
      icon: ComponentProps<typeof Icon>['icon'];
      name: string;
      onClick: () => void;
    }[];
  }[] = useMemo(() => {
    if (!storyTasks) {
      return [];
    }
    return storyTasks.docs.map((storyTask) => {
      return {
        title: storyTask.title,
        imagePath: currentUser?.image,
        name: currentUser?.name,
        // TODO: Childrenの中身を作成する
        children: <Box minHeight="250px"></Box>,
        actions: [
          {
            icon: 'Delete',
            name: '削除',
            onClick: () => handleClickDeleteStoryTask(storyTask._id),
          },
        ],
      };
    });
  }, [storyTasks, currentUser]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const { mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { mutate: mutateStoryForDelete } = useStoryForDelete();

  const { mutate: mutateIsOpenCreateNewStoryTaskModal } = useIsOpenCreateNewStoryTaskModal();

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

  const handleClickCreateStoryTaskButton = () => {
    mutateIsOpenCreateNewStoryTaskModal(true);
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
      <ProecoOgpHead title={story.title} description={story.description} />
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
        <Paper>
          <Typography variant="h4">{story.description}</Typography>
        </Paper>
        <Box my={4} maxWidth="600px" mx="auto">
          <TimeLine timeLineItems={timeLineItems} />
          <Box display="flex" alignItems="top" justifyContent="space-between" gap={0.5}>
            <UserIcon size={40} imagePath={currentUser?.image} userId={currentUser?._id} />
            <StyledBoxWrapper width="100%" position="relative">
              <StyledTriangle></StyledTriangle>
              <StyledBox p={5}>
                <Button variant="text" onClick={handleClickCreateStoryTaskButton}>
                  タスクを作成する
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
