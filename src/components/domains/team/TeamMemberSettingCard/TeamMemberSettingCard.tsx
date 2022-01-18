import React, { useState, VFC } from 'react';

import { ManageInviteLinkModal } from '~/components/domains/team/ManageInviteLinkModal';
import { Button, Card } from '~/components/parts/commons';
import { Team, User } from '~/domains';

type Props = {
  team: Team;
  currentUser: User;
};

export const TeamMemberSettingCard: VFC<Props> = ({ team, currentUser }) => {
  const [isOpenManageInviteLinkModal, setIsOpenManageInviteLinkModal] = useState(false);

  const isAdminOfTeam = team.adminUserId === currentUser._id;

  return (
    <>
      <Card>
        <Button color="primary" onClick={() => setIsOpenManageInviteLinkModal(true)} disabled={!isAdminOfTeam}>
          メンバーを招待する
        </Button>
      </Card>
      <ManageInviteLinkModal team={team} isOpen={isOpenManageInviteLinkModal} onCloseModal={() => setIsOpenManageInviteLinkModal(false)} />
    </>
  );
};
