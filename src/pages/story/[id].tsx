import React, { useState, MouseEvent } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';
import { useStoryForUpdate, useStoryForDelete } from '~/stores/story';

import { Icon, Typography } from '~/components/parts/commons/atoms';
import { ProecoOgpHead } from '~/components/parts/layout/organisms/ProecoOgpHead';
import { useStory } from '~/stores/story/useStory';
import { Menu } from '~/components/parts/commons/organisms/Menu';
import { IconButton } from '~/components/parts/commons/organisms/IconButton';

type Props = {
  storyFromServerSide?: Story;
};

const StoryPage: NextPage<Props> = ({ storyFromServerSide }) => {
  const router = useRouter();

  const { id } = router.query;
  const { data: story, mutate: mutateStoryFromServerSide } = useStory(id as string, storyFromServerSide);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!story) {
    return null;
  }

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const { mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { mutate: mutateStoryForDelete } = useStoryForDelete();

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
    mutateStoryForUpdate();
    mutateStoryFromServerSide();
    handleClose();
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
      icon: <Icon icon="Delete" width="20px" color="textColor.main" />,
      text: '削除する',
      onClick: handleClickDelete,
    },
  ];

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

export default StoryPage;
