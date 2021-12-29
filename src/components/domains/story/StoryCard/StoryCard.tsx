import React, { VFC, useMemo } from 'react';
import { Box, Skeleton } from '@mui/material';

import styled from 'styled-components';

import { Story } from '~/domains';
import { Card, Emoji, FixedImage, Link, SkeltonFixedImage } from '~/components/parts/commons';
import { useTeam } from '~/stores/team';
import { TeamIcon, SkeltonTeamIcon, GuestTeamIcon } from '~/components/domains/team/TeamIcon';
import { formatDistanceToNow } from '~/utils/formatDistanceToNow';
import { URLS } from '~/constants';
import { useAttachment } from '~/stores/attachment';
import { createOgpUrl } from '~/utils/createOgpUrl/createOgpUrl';

type Props = {
  story: Story;
};

export const SkeltonStoryCard: VFC = () => {
  return (
    <StyledStoryCard headerContent={<SkeltonFixedImage />}>
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
    () => team && teamIconAttachment && createOgpUrl(story.title, team.name, teamIconAttachment.filePath),
    [story, team, teamIconAttachment],
  );
  const displayDate = formatDistanceToNow(story.updatedAt);

  const StoryCardContent = useMemo(() => {
    return (
      <StyledStoryCard headerContent={ogpUrl ? <FixedImage imageUrl={ogpUrl} /> : <SkeltonFixedImage />}>
        <time className="text-light fs-4" dateTime={story.updatedAt.toLocaleDateString()}>
          {displayDate}
        </time>
        <div className="d-flex align-items-center">
          <span className="me-1">
            <Emoji emojiId={story.emojiId} size={20} />
          </span>
          <p className="fw-bold mb-0">{story.title}</p>
        </div>
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
