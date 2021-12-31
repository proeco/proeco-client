import { VFC } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import styled from 'styled-components';
import { StoryTableRow } from '~/components/domains/story/StoryTableRow';

import { Story } from '~/domains';

type Props = {
  stories: Story[];
  productId: string;
};

export const StoryListTable: VFC<Props> = ({ stories, productId }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledHeaderTableCell>
              <span className="text-light fs-3">作成者</span>
            </StyledHeaderTableCell>
            <StyledHeaderTableCell>
              <span className="text-light fs-3">ストーリー名</span>
            </StyledHeaderTableCell>
            <StyledHeaderTableCell align="right">
              <span className="text-light fs-3">最終更新日</span>
            </StyledHeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories.map((doc) => (
            <StoryTableRow story={doc} key={doc._id} productId={productId} />
          ))}
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
