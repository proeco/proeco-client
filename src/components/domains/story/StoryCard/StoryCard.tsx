import React, { VFC } from 'react';
import { Box, Chip, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Story } from '~/domains';
import { Emoji, Typography, Card } from '~/components/parts/commons';
import { useTeam } from '~/stores/team';
import { TeamIcon, SkeltonTeamIcon } from '~/components/domains/team/TeamIcon';
import { formatDistanceToNowHandler } from '~/utils/formatDistanceToNowHandler';

type Props = {
  story: Story;
};

export const SkeltonStoryCard: VFC = () => {
  return (
    <StyledStoryCard>
      <Box width="100%" bgcolor="#ced7fd" pt="40%" position="relative"></Box>
      <Box p="12px">
        <Skeleton variant="text" width="50px" />
        <Skeleton variant="text" width="100%" />
        <Box mt="12px" display="flex" alignItems="center" gap="8px">
          <SkeltonTeamIcon size={32} />
          <Skeleton variant="text" width="100px" />
        </Box>
      </Box>
    </StyledStoryCard>
  );
};

export const StoryCard: VFC<Props> = ({ story }) => {
  const { data: team } = useTeam({ teamId: story.teamId });

  const displayDate = formatDistanceToNowHandler(new Date(story.updatedAt));

  return (
    <StyledStoryCard>
      <StyledChip label={story.isCompleted ? 'Closed' : 'Open'} />
      <Box width="100%" bgcolor="#ced7fd" pt="40%" position="relative">
        <StyledBox>
          <Emoji emojiId={story.emojiId} size={48} />
        </StyledBox>
      </Box>
      <Box p="12px">
        <StyledTime dateTime={new Date(story.updatedAt).toLocaleDateString()}>{displayDate}</StyledTime>
        <Typography variant="body1" bold>
          {story.title}
        </Typography>
        <Box mt="12px" display="flex" alignItems="center" gap="8px">
          {team ? (
            <>
              <TeamIcon size={32} attachmentId={team.iconImageId} />
              <Typography>{team.name}</Typography>
            </>
          ) : (
            <>
              <SkeltonTeamIcon size={32} />
              <Skeleton variant="text" width="100px" />
            </>
          )}
        </Box>
      </Box>
    </StyledStoryCard>
  );
};

const StyledStoryCard = styled(Card)`
  padding: 0px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledTime = styled('time')`
  font-size: 10px;
  color: ${(props) => props.theme.palette.textColor.light};
`;

const StyledChip = styled(Chip)`
  position: absolute;
  z-index: 2;
  top: 8px;
  left: 8px;
  color: #fff;
  background-color: ${(props) => props.theme.palette.secondary.main};
`;
