import React, { VFC, useCallback } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { TableCell, TableRow } from '@mui/material';
import { Box, styled } from '@mui/system';

import { Emoji } from '~/components/parts/commons';
import { UserIcon, GuestUserIcon } from '~/components/domains/user/UserIcon';

import { DATE_FORMAT, URLS } from '~/constants';

import { Story } from '~/domains';
import { useTeamUsers } from '~/stores/team';

type Props = {
  story: Story;
  productId: string;
};

export const StoryTableRow: VFC<Props> = ({ story, productId }) => {
  const router = useRouter();

  const { data: teamUsers = [] } = useTeamUsers({ teamId: story.teamId });
  const createdStoryUser = teamUsers.find((teamUser) => teamUser._id === story.createdUserId);

  const handleClickRow = useCallback(() => {
    router.push(URLS.TEAMS_STORY(productId, story._id));
  }, [router, story._id, productId]);

  return (
    <StyledTableRow hover onClick={handleClickRow}>
      <StyledBodyTableCell component="th" scope="row" width={40}>
        {createdStoryUser ? (
          <UserIcon attachmentId={createdStoryUser.iconImageId} size={40} userId={story.createdUserId} isLink />
        ) : (
          <GuestUserIcon size={40} />
        )}
      </StyledBodyTableCell>
      <StyledBodyTableCell>
        <Box display="flex" alignItems="center" gap="8px">
          <Emoji emojiId={story.emojiId} size={20} />
          {story.title}
        </Box>
      </StyledBodyTableCell>
      <StyledBodyTableCell align="right">{format(story.updatedAt, DATE_FORMAT.EXCEPT_SECOND)}</StyledBodyTableCell>
    </StyledTableRow>
  );
};

const StyledBodyTableCell = styled(TableCell)<{ width?: number }>`
  &.MuiTableCell-root {
    ${(props) => props.width && `width: ${props.width}px;`}
    padding: 20px 16px;
    font-size: 14px;
  }
`;

const StyledTableRow = styled(TableRow)`
  &.MuiTableRow-root {
    cursor: pointer;
  }
`;
