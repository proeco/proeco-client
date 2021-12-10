import React, { VFC } from 'react';
import { Box, Card as MuiCard, Chip, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Story } from '~/domains';
import { Emoji, Typography } from '~/components/parts/commons';
import { useTeam } from '~/stores/team';
import { TeamIcon, SkeltonTeamIcon } from '~/components/domains/team/TeamIcon';

type Props = {
  story: Story;
};

export const StoryCard: VFC<Props> = ({ story }) => {
  const { data: team } = useTeam({ teamId: story.teamId });

  return (
    <StyledStoryCard>
      <Chip label={story.isCompleted ? 'Close' : 'Open'} />
      <Box>
        <Emoji emojiId={story.emojiId} size={48} />
      </Box>
      <Box>
        {team ? (
          <>
            <TeamIcon size={20} attachmentId={team.iconImageId} />
            <Typography>{team.name}</Typography>
          </>
        ) : (
          <>
            <SkeltonTeamIcon size={20} />
            <Skeleton variant="text" width="100%" />
          </>
        )}
      </Box>
    </StyledStoryCard>
  );
};

const StyledStoryCard = styled(MuiCard)`
  padding: 0px;
  box-sizing: border-box;
  position: relative;
`;
