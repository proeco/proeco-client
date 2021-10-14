import { useRouter } from 'next/router';
import { VFC } from 'react';

import { format } from 'date-fns';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { Typography } from '~/components/parts/commons/atoms';
import { TEXT_LIGHT_COLOR } from '~/constants/colors';
import { useStories } from '~/stores/story/useStories';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

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
  const router = useRouter();

  const handleClickRow = (storyId: string) => {
    router.push(`/story/${storyId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledHeaderTableCell>
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                ストーリー名
              </Typography>
            </StyledHeaderTableCell>
            <StyledHeaderTableCell align="right">
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                ステータス
              </Typography>
            </StyledHeaderTableCell>
            <StyledHeaderTableCell align="right">
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                応援者
              </Typography>
            </StyledHeaderTableCell>
            <StyledHeaderTableCell align="right">
              <Typography color={TEXT_LIGHT_COLOR} variant="caption">
                最終更新日
              </Typography>
            </StyledHeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories &&
            stories.docs.map((doc) => {
              return (
                <StyledTableRow key={doc._id} hover onClick={() => handleClickRow(doc._id)}>
                  <StyledBodyTableCell component="th" scope="row">
                    {doc.title}
                  </StyledBodyTableCell>
                  <StyledBodyTableCell align="right">完了</StyledBodyTableCell>
                  <StyledBodyTableCell align="right">TBD</StyledBodyTableCell>
                  <StyledBodyTableCell align="right">{format(new Date(doc.updatedAt), 'yyyy/MM/dd hh:ss')}</StyledBodyTableCell>
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
