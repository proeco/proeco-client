import React, { VFC, ComponentProps } from 'react';
import { Card as MuiCard } from '@mui/material';
import { Box } from '@mui/system';
import { Team } from '~/domains';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Typography } from '~/components/parts/commons';

type TeamCardType = {
  team: Team;
};

type Props = ComponentProps<typeof MuiCard> & TeamCardType;

export const TeamCard: VFC<Props> = ({ team, ...rest }) => {
  return (
    <MuiCard {...rest}>
      <Box>
        <UserIcon imagePath={team.iconImage} size={40} />
        <Typography variant="h3">{team.name}</Typography>
      </Box>
      <Typography variant="caption">{team.description}</Typography>
    </MuiCard>
  );
};
