import React, { VFC } from 'react';
import { Card as MuiCard } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Team } from '~/domains';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Link, Typography } from '~/components/parts/commons';

type Props = {
  team: Team;
};

export const TeamCard: VFC<Props> = ({ team }) => {
  return (
    <StyledBox>
      <Link href={`/teams/${team._id}`}>
        <StyledTeamCard>
          <Box display="flex" alignItems="center" mb="8px">
            <Box mr="8px">
              <UserIcon imagePath={team.iconImage} size={40} />
            </Box>
            <Typography variant="h3">{team.name}</Typography>
          </Box>
          <Typography variant="caption" lineHeight="1.5" letterSpacing="0" display="block">
            {team.description}
          </Typography>
        </StyledTeamCard>
      </Link>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  .MuiLink-root {
    position: relative;
    top: 0;
    display: block;
    width: fit-content;
    transition: all 0.3s;
    &:hover {
      top: -4px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
`;

const StyledTeamCard = styled(MuiCard)`
  width: 300px;
  height: 130px;
  padding: 20px;
  box-sizing: border-box;
`;
