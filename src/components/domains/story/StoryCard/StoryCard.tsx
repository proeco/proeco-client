import React, { VFC, useMemo } from 'react';
import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Story } from '~/domains';
import { Card, Link } from '~/components/parts/commons';
import { useTeam } from '~/stores/team';
import { TeamIcon, SkeltonTeamIcon, GuestTeamIcon } from '~/components/domains/team/TeamIcon';
import { formatDistanceToNow } from '~/utils/formatDistanceToNow';
import { IMAGE_PATH, URLS } from '~/constants';
import { useAttachment } from '~/stores/attachment';

type Props = {
  story: Story;
};

export const SkeltonStoryCard: VFC = () => {
  return (
    <StyledStoryCard imagePath={IMAGE_PATH.NO_IMAGE}>
      <Skeleton variant="text" width="50px" />
      <Skeleton variant="text" width="100%" />
      <Box mt="12px" display="flex" alignItems="center" gap="8px">
        <SkeltonTeamIcon size={32} />
        <Skeleton variant="text" width="100px" />
      </Box>
    </StyledStoryCard>
  );
};

export const StoryCard: VFC<Props> = ({ story }) => {
  const { data: team } = useTeam({ teamId: story.teamId });
  const { data: teamIconAttachment } = useAttachment(team?.iconImageId);

  const ogpUrl = useMemo(
    () =>
      team && teamIconAttachment
        ? `https://proeco-ogp.vercel.app/api/ogp?title=${story.title}&teamName=${team.name}&teamIconUrl=${teamIconAttachment.filePath}`
        : '',
    [story, team, teamIconAttachment],
  );
  const displayDate = formatDistanceToNow(story.updatedAt);

  const StoryCardContent = useMemo(() => {
    return (
      <StyledStoryCard imagePath={ogpUrl}>
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
      </StyledStoryCard>
    );
  }, [displayDate, story, team, ogpUrl]);

  if (!team) return StoryCardContent;

  return <Link href={URLS.TEAMS_STORY(team.productId, story._id)}>{StoryCardContent}</Link>;
};

const StyledStoryCard = styled(Card)`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  top: 0;
  transition: all 0.3s;
`;

const StyledTime = styled('time')`
  font-size: 10px;
  color: ${(props) => props.theme.palette.textColor.light};
`;
