import React, { useState, VFC } from 'react';

import { TeamMemberTableRow } from '../TeamMemberTableRow';
import { ManageInviteLinkModal } from '~/components/domains/team/ManageInviteLinkModal';
import { Button, Card, Tooltip } from '~/components/parts/commons';
import { Team, User } from '~/domains';
import { useTeamUsers } from '~/stores/team';

type Props = {
  team: Team;
  currentUser: User;
};

export const TeamMemberSettingCard: VFC<Props> = ({ team, currentUser }) => {
  const [isOpenManageInviteLinkModal, setIsOpenManageInviteLinkModal] = useState(false);

  const { data: teamUsers = [] } = useTeamUsers({ teamId: team._id });

  return (
    <>
      <Card>
        <Tooltip text="管理者のみが操作可能です" disabled={team.adminUserId === currentUser._id}>
          <Button color="primary" onClick={() => setIsOpenManageInviteLinkModal(true)} disabled={team.adminUserId !== currentUser._id}>
            メンバーを招待する
          </Button>
        </Tooltip>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">アイコン</th>
              <th scope="col">ユーザー名</th>
              <th scope="col">ステータス</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {teamUsers.map((user) => (
              <TeamMemberTableRow key={user._id} team={team} user={user} />
            ))}
          </tbody>
        </table>
      </Card>
      <ManageInviteLinkModal team={team} isOpen={isOpenManageInviteLinkModal} onCloseModal={() => setIsOpenManageInviteLinkModal(false)} />
    </>
  );
};
