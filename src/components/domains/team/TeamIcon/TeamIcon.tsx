import React, { VFC } from 'react';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { FirstLetterIcon } from '~/components/parts/commons/FirstLetterIcon';
import { Team } from '~/domains';

type Props = {
  team: Team;
  size?: number;
};

export const TeamIcon: VFC<Props> = ({ team, size = 40 }) => {
  if (team.iconImage) return <UserIcon size={size} imagePath={team.iconImage} />;
  return <FirstLetterIcon size={size} name={team.name} />;
};
