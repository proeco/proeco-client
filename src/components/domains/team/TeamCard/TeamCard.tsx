import React, { VFC } from 'react';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { Card } from '~/components/parts/commons';
import { useOgp } from '~/stores/ogp';
import { IMAGE_PATH } from '~/constants';

type Props = {
  name: string;
  productId: string;
  description: string;
  attachmentId: string;
  url: string;
};

export const SkeltonTeamCard: VFC = () => {
  return (
    <StyledTeamCard>
      <StyledDiv className="position-relative w-100">
        <StyledSkeleton className="position-absolute" variant="rectangular" />
      </StyledDiv>
      <Box display="flex" alignItems="center" p={2}>
        <Box mr="8px">
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Skeleton variant="text" width="100%" />
      </Box>
      <Box>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </Box>
    </StyledTeamCard>
  );
};

export const TeamCard: VFC<Props> = ({ name, productId, description, attachmentId, url }) => {
  const { data: ogp } = useOgp(url);

  return (
    <StyledTeamCard imagePath={ogp?.image || IMAGE_PATH.NO_IMAGE}>
      <Box position="absolute" top={-25} display="flex" gap={1} alignItems="end" mb="8px">
        <TeamIcon size={50} attachmentId={attachmentId} />
        <span className="fw-bold maximum_lines_1">{name}</span>
        <span className="text-light fs-3 maximum_lines_1">@{productId}</span>
      </Box>
      <span className="mt-3 fs-3 maximum_lines_2">{description}</span>
    </StyledTeamCard>
  );
};

const StyledDiv = styled.div`
  padding-top: 52.5%;
`;

const StyledSkeleton = styled(Skeleton)`
  object-fit: cover;
  top: -16px;
  left: -16px;
  width: calc(100% + 32px);
  height: calc(100% + 16px);
`;

const StyledTeamCard = styled(Card)`
  box-sizing: border-box;
  position: relative;
  top: 0;
  width: 100%;
  transition: all 0.3s;
`;
