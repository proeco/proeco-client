import React, { useState, MouseEvent, VFC } from 'react';
import { format } from 'date-fns';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { MoreVert as MoreVertIcon, Update as UpdateIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Menu } from '~/components/parts/commons/organisms/Menu';
import { DATE_FORMAT } from '~/constants';
import { Story } from '~/domains';
import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useStoryForUpdate } from '~/stores/story';

type Props = {
  story: Story;
};

export const StoryTableRow: VFC<Props> = ({ story }) => {
  const [selectStory, setSelectStory] = useState<Story | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const handleClickMenu = (event: MouseEvent<HTMLElement>, story: Story) => {
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
      onClick: () => console.log(selectStory),
    },
  ];

  return (
    <StyledTableRow hover>
      {/* <StyledTableRow key={doc._id} hover onClick={() => handleClickRow(doc._id)}> */}
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
      <Menu anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
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
