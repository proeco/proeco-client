import React, { VFC } from 'react';
import { Skeleton } from '@mui/material';
import { Box, styled } from '@mui/system';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { Typography, Card } from '~/components/parts/commons';
import { useOgp } from '~/stores/ogp';
import { FixedImage } from '~/components/parts/commons/FixedImage';
import { COLORS } from '~/constants';

type Props = {
  name: string;
  productId: string;
  description: string;
  attachmentId: string;
  url: string;
  onClick?: () => void;
};

export const SkeltonTeamCard: VFC = () => {
  return (
    <StyledTeamCard>
      <FixedImage />
      <Box p={2}>
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
      </Box>
    </StyledTeamCard>
  );
};

export const TeamCard: VFC<Props> = ({ name, productId, description, attachmentId, url, onClick }) => {
  const { data: ogp } = useOgp(url);

  return (
    <StyledTeamCard onClick={onClick}>
      <FixedImage imageUrl={ogp?.image} />
      <Box position="relative" p={2}>
        <Box position="absolute" top={-25} display="flex" gap={1} alignItems="end" mb="8px">
          <TeamIcon size={50} attachmentId={attachmentId} />
          <Typography variant="body1" bold>
            {name}
          </Typography>
          <Typography variant="caption" color={COLORS.TEXT_LIGHT}>
            @{productId}
          </Typography>
        </Box>
        <StyledDescription mt={2} variant="caption" maximum_lines={2}>
          {description}
        </StyledDescription>
      </Box>
    </StyledTeamCard>
  );
};

const StyledTeamCard = styled(Card)`
  padding: 0px;
  box-sizing: border-box;
  position: relative;
  top: 0;
  width: 100%;
  transition: all 0.3s;
  ${(props) =>
    props.onClick &&
    `cursor: pointer;
      &:hover {
    top: -4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }`}
`;

const StyledDescription = styled(Typography)`
  line-height: 1.5;
  letter-spacing: 0;
`;
