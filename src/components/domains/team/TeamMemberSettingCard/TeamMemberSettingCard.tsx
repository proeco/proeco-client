import React, { useState, VFC } from 'react';

import { ManageInviteLinkModal } from '~/components/domains/team/ManageInviteLinkModal';
import { Button, Card, Tooltip } from '~/components/parts/commons';
import { Team, User } from '~/domains';

type Props = {
  team: Team;
  currentUser: User;
};

export const TeamMemberSettingCard: VFC<Props> = ({ team, currentUser }) => {
  const [isOpenManageInviteLinkModal, setIsOpenManageInviteLinkModal] = useState(false);

  return (
    <>
      <Card>
        <Tooltip text="管理者のみが操作可能です" disabled={team.adminUserId === currentUser._id}>
          <Button color="primary" onClick={() => setIsOpenManageInviteLinkModal(true)} disabled={team.adminUserId !== currentUser._id}>
            メンバーを招待する
          </Button>
        </Tooltip>
      </Card>
      <ManageInviteLinkModal team={team} isOpen={isOpenManageInviteLinkModal} onCloseModal={() => setIsOpenManageInviteLinkModal(false)} />
    </>
  );
};
