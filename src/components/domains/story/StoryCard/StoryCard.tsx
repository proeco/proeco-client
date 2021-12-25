import React, { VFC, useMemo } from 'react';
import { Box, Chip, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Story } from '~/domains';
import { Emoji, Card, Link } from '~/components/parts/commons';
import { useTeam } from '~/stores/team';
import { TeamIcon, SkeltonTeamIcon, GuestTeamIcon } from '~/components/domains/team/TeamIcon';
import { formatDistanceToNow } from '~/utils/formatDistanceToNow';
import { URLS } from '~/constants';

type Props = {
  story: Story;
  isLink?: boolean;
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

export const StoryCard: VFC<Props> = ({ story, isLink = false }) => {
  const { data: team } = useTeam({ teamId: story.teamId });

  const displayDate = formatDistanceToNow(story.updatedAt);

  const StoryCardContent = useMemo(() => {
    return (
      <StyledStoryCard>
        <StyledChip label={story.isCompleted ? 'Closed' : 'Open'} />
        <Box width="100%" bgcolor="#ced7fd" pt="40%" position="relative">
          <StyledBox>
            <Emoji emojiId={story.emojiId} size={48} />
          </StyledBox>
        </Box>
        <Box p="12px">
          <StyledTime dateTime={story.updatedAt.toLocaleDateString()}>{displayDate}</StyledTime>
          <p className="fw-bold mb-0">{story.title}</p>
          <Box mt="12px" display="flex" alignItems="center" gap="8px">
            {team ? (
              <>
                <TeamIcon size={32} attachmentId={team.iconImageId} />
                <span className="fs-2">{team.name}</span>
              </>
            ) : (
              <>
                <GuestTeamIcon size={32} />
                <span className="fs-2">undefined</span>
              </>
            )}
          </Box>
        </Box>
      </StyledStoryCard>
    );
  }, [displayDate, story, team]);

  if (!isLink || !team) return StoryCardContent;

  return <Link href={URLS.TEAMS_STORY(team.productId, story._id)}>{StoryCardContent}</Link>;
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
