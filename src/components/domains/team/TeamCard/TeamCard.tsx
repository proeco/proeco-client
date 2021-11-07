import React, { VFC } from 'react';
import { Avatar, Skeleton } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Team } from '~/domains';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Typography, Card } from '~/components/parts/commons';

type Props = {
  team: Team;
  isSkeltonMode?: boolean;
  onClick: () => void;
};

export const TeamCard: VFC<Props> = ({ team, isSkeltonMode = false, onClick }) => {
  if (isSkeltonMode) {
    return (
      <StyledTeamCard onClick={onClick}>
        <Box display="flex" alignItems="center" mb="8px">
          <Box mr="8px">
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
          <Skeleton variant="text" width="100px" />
        </Box>
        <Skeleton variant="text" width="260px" />
        <Skeleton variant="text" width="260px" />
      </StyledTeamCard>
    );
  }
  return (
    <StyledTeamCard onClick={onClick}>
      <Box display="flex" alignItems="center" mb="8px">
        <Box mr="8px">{team.iconImage ? <UserIcon size={40} imagePath={team.iconImage} /> : <Avatar>{team.name[0]}</Avatar>}</Box>
        <Typography variant="h3" noWrap width="220px">
          {team.name}
        </Typography>
      </Box>
      <StyledDescription variant="caption">{team.description}</StyledDescription>
    </StyledTeamCard>
  );
};

const StyledTeamCard = styled(Card)`
  width: 300px;
  height: 130px;
  box-sizing: border-box;
  position: relative;
  top: 0;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    top: -4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const StyledDescription = styled(Typography)`
  line-height: 1.5;
  letter-spacing: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
