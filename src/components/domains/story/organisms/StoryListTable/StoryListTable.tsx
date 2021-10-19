// import { useRouter } from 'next/router';
import { VFC } from 'react';

import { format } from 'date-fns';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';

import { useStories } from '~/stores/story/useStories';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { Button, Typography } from '~/components/parts/commons/atoms';
import { COLORS, DATE_FORMAT } from '~/constants';
import { Story } from '~/domains';
import { useStoryForUpdate } from '~/stores/story';
import { useIsOpenCreateNewStoryModal } from '~/stores/modal/useIsOpenCreateNewStory';

type Props = {
  page: number;
  limit: 10;
};

export const StoryListTable: VFC<Props> = ({ page, limit }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: stories } = useStories({
    userId: currentUser?._id,
    page,
    limit,
  });
  // const router = useRouter();

  const { mutate: mutateIsOpenCreateNewStoryModal } = useIsOpenCreateNewStoryModal();
  const { mutate: mutateStoryForUpdate } = useStoryForUpdate();

  // const handleClickRow = (storyId: string) => {
  //   router.push(`/story/${storyId}`);
  // };

  const handleClickMenu = (story: Story) => {
    // 後でupdateのを使う
    mutateIsOpenCreateNewStoryModal(true);
    mutateStoryForUpdate(story);
  };

  return (
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
            <StyledHeaderTableCell align="right">
              <Typography color={COLORS.TEXT_LIGHT} variant="caption">
                ここに 3点ドット
              </Typography>
            </StyledHeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories &&
            stories.docs.map((story) => {
              return (
                <StyledTableRow key={story._id} hover>
                  {/* // <StyledTableRow key={doc._id} hover onClick={() => handleClickRow(doc._id)}> */}
                  <StyledBodyTableCell component="th" scope="row">
                    {story.title}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell align="right">完了</StyledBodyTableCell>
                  <StyledBodyTableCell align="right">TBD</StyledBodyTableCell>
                  <StyledBodyTableCell align="right">{format(new Date(story.updatedAt), DATE_FORMAT.EXCEPT_SECOND)}</StyledBodyTableCell>
                  <StyledBodyTableCell align="right">
                    <Button onClick={() => handleClickMenu(story)}>ここにmenuを開く3点ドット</Button>
                  </StyledBodyTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
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
