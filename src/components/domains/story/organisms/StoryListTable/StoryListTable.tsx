import { useState, VFC } from 'react';
// import { useRouter } from 'next/router';

import { format } from 'date-fns';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { restClient } from '~/utils/rest-client';
import { Typography } from '~/components/parts/commons/atoms';
import { useStories } from '~/stores/story/useStories';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { DeleteStoryModal } from '~/components/domains/story/organisms/DeleteStoryModal';

import { COLORS, DATE_FORMAT } from '~/constants';
import { Story } from '~/domains';
import { useStoryForUpdate } from '~/stores/story';
import { useIsOpenUpdateStoryModal } from '~/stores/modal/useIsOpenUpdateStoryModal';

type Props = {
  page: number;
  limit: 10;
};

export const StoryListTable: VFC<Props> = ({ page, limit }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: stories, mutate: mutateStories } = useStories({
    userId: currentUser?._id,
    page,
    limit,
  });
  // const router = useRouter();
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { mutate: mutateIsOpenUpdateStoryModal } = useIsOpenUpdateStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  // const handleClickRow = (storyId: string) => {
  //   router.push(`/story/${storyId}`);
  // };

  const handleClickMenu = (story: Story) => {
    mutateIsOpenUpdateStoryModal(true);
    mutateStoryForUpdate(story);
  };

  // const handleDeleteStoryConfirm = (e: MouseEvent, story: Story) => {
  //   e.stopPropagation();
  //   setStoryToDelete(story);
  // };

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

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledHeaderTableCell>
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  ストーリー名
                </Typography>
              </StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  ステータス
                </Typography>
              </StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  応援者
                </Typography>
              </StyledHeaderTableCell>
              <StyledHeaderTableCell align="right">
                <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                  最終更新日
                </Typography>
              </StyledHeaderTableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {stories &&
              stories.docs.map((doc) => (
                <StyledTableRow key={doc._id} hover>
                  {/* <StyledTableRow key={doc._id} hover onClick={() => handleClickRow(doc._id)}> */}
                  <StyledBodyTableCell component="th" scope="row">
                    {doc.title}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell align="right">完了</StyledBodyTableCell>
                  <StyledBodyTableCell align="right">TBD</StyledBodyTableCell>
                  <StyledBodyTableCell align="right">{format(new Date(doc.updatedAt), DATE_FORMAT.EXCEPT_SECOND)}</StyledBodyTableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleClickMenu(doc)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteStoryModal onClose={() => setStoryToDelete(null)} onDeleteStory={handleDeleteStory} storyToDelete={storyToDelete} />
    </>
  );
};

const StyledHeaderTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    padding: 6px 16px;
  }
`;

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
