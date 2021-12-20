import React, { VFC } from 'react';
import { TeamForm } from '~/components/domains/team/TeamForm';
import { Team, User } from '~/domains';

type Props = {
  currentUser: User;
  team: Team;
};

export const TeamSettingTab: VFC<Props> = ({ currentUser, team }) => {
  return <TeamForm currentUser={currentUser} team={team} />;
};
