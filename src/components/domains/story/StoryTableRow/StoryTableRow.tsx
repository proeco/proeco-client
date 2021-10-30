import React, { useState, MouseEvent, VFC } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { TableCell, TableRow } from '@mui/material';
import { Box, styled } from '@mui/system';

import { Menu } from '~/components/parts/commons/Menu';
import { IconButton } from '~/components/parts/commons/IconButton';
import { Icon, Emoji } from '~/components/parts/commons/atoms';

import { DATE_FORMAT } from '~/constants';

import { Story } from '~/domains';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';
import { useStoryForUpdate, useStoryForDelete } from '~/stores/story';

type Props = {
  story: Story;
};

export const StoryTableRow: VFC<Props> = ({ story }) => {
  const router = useRouter();

  const [selectStory, setSelectStory] = useState<Story | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const { mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { mutate: mutateStoryForDelete } = useStoryForDelete();

  const handleClickRow = (storyId: string) => {
    router.push(`/story/${storyId}`);
  };

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
    if (!selectStory) return;
    mutateIsOpenDeleteStoryModal(true);
    mutateStoryForDelete(selectStory);
    handleClose();
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
    <StyledTableRow hover onClick={() => handleClickRow(story._id)}>
      <StyledBodyTableCell component="th" scope="row">
        <Box display="flex" alignItems="center" gap="8px">
          <Emoji emojiId={story.emojiId} size={20} />
          {story.title}
        </Box>
      </StyledBodyTableCell>
      <StyledBodyTableCell align="right">完了</StyledBodyTableCell>
      <StyledBodyTableCell align="right">TBD</StyledBodyTableCell>
      <StyledBodyTableCell align="right">{format(new Date(story.updatedAt), DATE_FORMAT.EXCEPT_SECOND)}</StyledBodyTableCell>
      <TableCell align="right">
        <IconButton icon="MoreVert" width={24} onClick={(e) => handleClickMenu(e, story)} />
      </TableCell>
      <Menu onClick={(e) => e.stopPropagation()} anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
    </StyledTableRow>
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
