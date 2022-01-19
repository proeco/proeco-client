import React, { VFC } from 'react';

import { Button, Icon, Modal } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useTeamUsers } from '~/stores/team';
import { restClient } from '~/utils/rest-client';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  userId: string;
  teamId: string;
};

export const DeleteTeamMemberModal: VFC<Props> = ({ isOpen, onCloseModal, userId, teamId }) => {
  const { mutate: mutateTeamUsers } = useTeamUsers({ teamId });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const handleClickDeleteTeamMember = async () => {
    try {
      await restClient.apiDelete('/user-team-relations', {
        userId,
        teamId,
      });
      notifySuccessMessage('プロダクトからメンバーを削除しました!');
      await mutateTeamUsers();
      onCloseModal();
    } catch (error) {
      notifyErrorMessage('プロダクトからメンバーを削除に失敗しました!');
    }
  };

  const content = (
    <>
      <div className="mb-3 text-center">※ この操作は戻すことが出来ません。</div>
      <div className="text-center mt-5">
        <Button color="danger" onClick={handleClickDeleteTeamMember}>
          <Icon icon="TRASH" size={20} color="WHITE" />
          削除する
        </Button>
      </div>
    </>
  );
  return <Modal open={isOpen} title="プロダクトからメンバーを削除しますか？" emojiId="airplane" onClose={onCloseModal} content={content} />;
};
