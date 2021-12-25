import React, { VFC } from 'react';
import { TeamForm } from '~/components/domains/team/TeamForm';
import { Icon } from '~/components/parts/commons';
import { Team, User } from '~/domains';

type Props = {
  currentUser: User;
  team: Team;
};

export const TeamSettingTab: VFC<Props> = ({ currentUser, team }) => {
  return (
    <>
      <h2 className="fw-bold mb-２ d-flex align-items-center gap-2">
        <Icon icon="GEAR" size={32} />
        設定
      </h2>
      <TeamForm currentUser={currentUser} team={team} />
    </>
  );
};
