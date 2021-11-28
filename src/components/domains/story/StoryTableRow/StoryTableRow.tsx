import React, { useState, MouseEvent, VFC, useCallback } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { ListItemIcon, MenuItem, TableCell, TableRow } from '@mui/material';
import { Box, styled } from '@mui/system';

import { Icon, Emoji, IconButton, Menu } from '~/components/parts/commons';

import { DATE_FORMAT, COLORS, URLS } from '~/constants';

import { Story } from '~/domains';

import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';
import { useIsOpenDeleteStoryModal } from '~/stores/modal/useIsOpenDeleteStoryModal';
import { useStoryForUpdate, useStoryForDelete } from '~/stores/story';
import { Dropdown } from '~/components/parts/commons/Dropdown';

type Props = {
  story: Story;
};

export const StoryTableRow: VFC<Props> = ({ story }) => {
  const router = useRouter();

  const [selectStory, setSelectStory] = useState<Story | null>(null);

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  const { mutate: mutateIsOpenDeleteStoryModal } = useIsOpenDeleteStoryModal();
  const { mutate: mutateStoryForDelete } = useStoryForDelete();

  const handleClickRow = useCallback(() => {
    router.push(URLS.TEAMS_STORY(story.teamId, story._id));
  }, [router, story._id, story.teamId]);

  const handleClickUpdate = () => {
    if (!selectStory) return;
    mutateIsOpenUpdateStoryModal(true);
    mutateStoryForUpdate(selectStory);
  };

  const handleClickDelete = () => {
    if (!selectStory) return;
    mutateIsOpenDeleteStoryModal(true);
    mutateStoryForDelete(selectStory);
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

  return (
    <StyledTableRow hover onClick={handleClickRow}>
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
        <Dropdown toggle={<IconButton icon="MoreVert" width={24} />}>
          {menuItems.map((menuItem, i) => (
            <MenuItem key={i} onClick={menuItem.onClick}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              {menuItem.text}
            </MenuItem>
          ))}
        </Dropdown>
      </TableCell>
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
