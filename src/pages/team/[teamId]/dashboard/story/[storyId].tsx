import React, { useState, MouseEvent, ReactNode, ComponentProps } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';
import { useStoryForUpdate, useStoryForDelete } from '~/stores/story';

import { Button, Icon, TimeLine, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { useStory } from '~/stores/story/useStory';
import { Menu } from '~/components/parts/commons/Menu';
import { IconButton } from '~/components/parts/commons/IconButton';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { COLORS } from '~/constants';
import { TeamDashboardLayout } from '~/components/parts/layout/TeamDashboardLayout';
import { useIsOpenCreateNewStoryTaskModal } from '~/stores/modal/useIsOpenCreateNewStoryTaskModal';
import { useStoryTasks } from '~/stores/storyTask';
import { useTeam } from '~/stores/team';

type Props = {
  storyFromServerSide?: Story;
};

const StoryPage: ProecoNextPage<Props> = ({ storyFromServerSide }) => {
  const router = useRouter();

  const { teamId, storyId } = router.query;
  const { data: story } = useStory(storyId as string, storyFromServerSide);
  const { data: currentTeam } = useTeam({
    teamId: teamId as string,
  });
  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: storyTasks } = useStoryTasks({
    storyId: storyId as string,
    page: page,
    limit: 10,
  });

  const timeLineItems: {
    title: string;
    imagePath?: string;
    children: ReactNode;
    actions: {
      icon: ComponentProps<typeof Icon>['icon'];
      name: string;
      onClick: () => void;
    }[];
  }[] = storyTasks
    ? storyTasks.docs.map((storyTask) => {
        return {
          title: storyTask.title,
          imagePath: currentTeam?.iconImage,
          name: currentTeam?.name,
          // TODO: Childrenの中身を作成する
          children: <Box width="500px" height="250px"></Box>,
          // TODO: DeleteStoryTaskModalを作成する
          actions: [
            {
              icon: 'Delete',
              name: '削除',
              onClick: () => console.log('削除'),
            },
          ],
        };
      })
    : [];

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
      <ProecoOgpHead />
      <Box p={5} mx="auto" maxWidth="1200px">
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h2" bold>
            {story.title}
          </Typography>
          <IconButton icon="MoreVert" width={24} onClick={(e) => handleClickMenu(e)} />
          <Menu onClick={(e) => e.stopPropagation()} anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
        </Box>
        <Typography variant="h4">{story.description}</Typography>
        <Button variant="contained" onClick={handleClickCreateStoryTaskButton}>
          タスクを作成する
        </Button>
        <TimeLine timeLineItems={timeLineItems} />
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
