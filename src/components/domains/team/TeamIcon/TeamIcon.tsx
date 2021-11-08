import React, { VFC } from 'react';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { Team } from '~/domains';

type Props = {
  team: Team;
};

export const TeamIcon: VFC<Props> = ({ team }) => {
  return <UserIcon size={40} imagePath={team.iconImage} />;
};
