import React, { VFC } from 'react';
import { TeamForm } from '~/components/domains/team/TeamForm';
import { Team, User } from '~/domains';

type Props = {
  currentUser: User;
  team: Team;
};

export const TeamSettingTab: VFC<Props> = ({ currentUser, team }) => {
  return (
    <>
      <div className="row gy-3">
        <div className="list-group col-12 col-md-3">
          <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
            基本設定
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            重要な設定
          </a>
        </div>
        <div className="col-12 col-md-9">
          <TeamForm currentUser={currentUser} team={team} />
        </div>
      </div>
    </>
  );
};
