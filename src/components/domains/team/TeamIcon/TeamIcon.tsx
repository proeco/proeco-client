import { Avatar } from '@mui/material';
import React, { VFC } from 'react';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Team } from '~/domains';

type Props = {
  team: Team;
};

export const TeamIcon: VFC<Props> = ({ team }) => {
  if (team.iconImage) return <UserIcon size={40} imagePath={team.iconImage} />;

  return <Avatar>{team.name[0]}</Avatar>;
};
