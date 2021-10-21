import React, { useState, MouseEvent, VFC } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { MoreVert as MoreVertIcon, Update as UpdateIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { Menu } from '~/components/parts/commons/organisms/Menu';
import { DeleteStoryModal } from '~/components/domains/story/organisms/DeleteStoryModal';

import { DATE_FORMAT } from '~/constants';

import { Story } from '~/domains';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useStoryForUpdate, useStories } from '~/stores/story';
// DeleteStoryModal.tsxを修正した後、こちらを使用する
// import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';

import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';

import { restClient } from '~/utils/rest-client';

type Props = {
  story: Story;
  page: number;
  limit: 10;
};

export const StoryTableRow: VFC<Props> = ({ story, page, limit }) => {
  const router = useRouter();

  const [selectStory, setSelectStory] = useState<Story | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const handleClickRow = (storyId: string) => {
    router.push(`/story/${storyId}`);
  };

  // TODO: DeleteStoryModal関連コードをDeleteStoryModal.tsxにまとめる
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateStories } = useStories({
    userId: currentUser?._id,
    page,
    limit,
  });

  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const handleDeleteStory = async () => {
    try {
      await restClient.apiDelete(`/stories/${storyToDelete?._id}`);
      setStoryToDelete(null);
      mutateStories();
      notifySuccessMessage('ストーリーを削除しました!');
    } catch (error) {
      notifyErrorMessage('ストーリーの削除に失敗しました!');
    }
  };

  // DeleteStoryModal.tsxを修正した後、こちらを使用する
  // const { mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  // const { mutate: mutateStoryForDelete } = useStoryForDelete();

  const handleClickMenu = (event: MouseEvent<HTMLElement>, story: Story) => {
    event.stopPropagation();
    setSelectStory(story);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpdate = () => {
    if (!selectStory) return;
    mutateIsOpenUpdateStoryModal(true);
    mutateStoryForUpdate(selectStory);
    handleClose();
  };

  const handleClickDelete = () => {
    setStoryToDelete(selectStory);
    handleClose();
    // DeleteStoryModal.tsxを修正した後、こちらを使用する
    // if (!selectStory) return;
    // mutateIsOpenDeleteStoryModal(true);
    // mutateStoryForDelete(selectStory);
  };

  const menuItems = [
    {
      icon: <UpdateIcon fontSize="small" sx={{ color: 'textColor.main' }} />,
      text: '更新する',
      onClick: handleClickUpdate,
    },
    {
      icon: <DeleteIcon fontSize="small" sx={{ color: 'textColor.main' }} />,
      text: '削除する',
      onClick: handleClickDelete,
    },
  ];

  return (
    <>
      <StyledTableRow hover onClick={() => handleClickRow(story._id)}>
        <StyledBodyTableCell component="th" scope="row">
          {story.title}
        </StyledBodyTableCell>
        <StyledBodyTableCell align="right">完了</StyledBodyTableCell>
        <StyledBodyTableCell align="right">TBD</StyledBodyTableCell>
        <StyledBodyTableCell align="right">{format(new Date(story.updatedAt), DATE_FORMAT.EXCEPT_SECOND)}</StyledBodyTableCell>
        <TableCell align="right">
          <IconButton onClick={(e) => handleClickMenu(e, story)}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
        <Menu onClick={(e) => e.stopPropagation()} anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
      </StyledTableRow>
      <DeleteStoryModal onClose={() => setStoryToDelete(null)} onDeleteStory={handleDeleteStory} storyToDelete={storyToDelete} />
    </>
  );
};

const StyledBodyTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    padding: 20px 16px;
    font-size: 14px;
  }
`;

const StyledTableRow = styled(TableRow)`
  &.MuiTableRow-root {
    cursor: pointer;
  }
`;
