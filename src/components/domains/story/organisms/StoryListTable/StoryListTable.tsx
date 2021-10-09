import { VFC } from 'react';

import { format } from 'date-fns';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { Typography } from '~/components/parts/commons/atoms';
import { TEXT_LIGHT_COLOR } from '~/constants/colors';
import { useStories } from '~/hooks/story/useStories';
import { useCurrentUser } from '~/hooks/user/useCurrentUser';

const page = 1;
const limit = 10;

export const StoryListTable: VFC = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: stories } = useStories({ userId: currentUser?._id, page, limit });

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
                <StyledTableRow key={doc._id} hover>
                  <StyledBodyTableCell component="th" scope="row">
                    <Typography variant="body2">{doc.title}</Typography>
                  </StyledBodyTableCell>
                  <StyledBodyTableCell align="right">
                    <Typography variant="body2">完了</Typography>
                  </StyledBodyTableCell>
                  <StyledBodyTableCell align="right">
                    <Typography variant="body2">TBD</Typography>
                  </StyledBodyTableCell>
                  <StyledBodyTableCell align="right">
                    <Typography variant="body2">{format(new Date(doc.updatedAt), 'yyyy/MM/dd hh:ss')}</Typography>
                  </StyledBodyTableCell>
                </StyledTableRow>
              );
            })}
          {!stories && <Typography>No Stories</Typography>}
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
  }
`;

const StyledTableRow = styled(TableRow)`
  &.MuiTableRow-root {
    cursor: pointer;
  }
`;
