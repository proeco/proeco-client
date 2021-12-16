import React, { VFC, useCallback } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { TableCell, TableRow } from '@mui/material';
import { Box, styled } from '@mui/system';

import { Emoji } from '~/components/parts/commons';

import { DATE_FORMAT, URLS } from '~/constants';

import { Story } from '~/domains';

type Props = {
  story: Story;
  productId: string;
};

export const StoryTableRow: VFC<Props> = ({ story, productId }) => {
  const router = useRouter();

  const handleClickRow = useCallback(() => {
    router.push(URLS.TEAMS_STORY(productId, story._id));
  }, [router, story._id, productId]);

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
      <StyledBodyTableCell align="right">{format(story.updatedAt, DATE_FORMAT.EXCEPT_SECOND)}</StyledBodyTableCell>
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
