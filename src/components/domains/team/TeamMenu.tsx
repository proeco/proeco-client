import React, { VFC } from 'react';
import { Box } from '@mui/system';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { IconButton, Typography } from '~/components/parts/commons';
import { Team } from '~/domains';

type Props = {
  currentTeam: Team;
};

export const TeamMenu: VFC<Props> = ({ currentTeam }) => {
  return (
    <Box>
      <UserIcon size="small" imagePath={currentTeam.iconImage} />
      <Typography>{currentTeam.name}</Typography>
      <IconButton width={24} icon="KeyboardArrowDown" />
    </Box>
  );
};
