import React, { useState, VFC } from 'react';

import { Button, Icon, Modal } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useTeam } from '~/stores/team';
import { restClient } from '~/utils/rest-client';

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  userId: string;
  userName: string;
  teamId: string;
};

export const UpdateTeamAdminUserModal: VFC<Props> = ({ isOpen, onCloseModal, userId, userName, teamId }) => {
  const { mutate: mutateTeam } = useTeam({ teamId });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const [inputValue, setInputValue] = useState('');

  const handleClickUpdateTeamAdminUser = async () => {
    try {
      await restClient.apiPut(`/teams/${teamId}`, {
        team: { adminUserId: userId },
      });
      notifySuccessMessage('プロダクトの管理者を変更しました!');
      await mutateTeam();
      setInputValue('');
      onCloseModal();
    } catch (error) {
      notifyErrorMessage('プロダクトの管理者の変更に失敗しました!');
    }
  };

  const content = (
    <>
      <p className="mb-3 text-center">※この操作を行うと、あなたは管理者権限を失います。</p>
      <p>フォームに {userName} と入力してください</p>
      <input className="form-control" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <div className="text-center mt-5">
        <Button color="danger" onClick={handleClickUpdateTeamAdminUser} disabled={inputValue !== userName}>
          <Icon icon="CLOCKWISE" size={20} color="WHITE" />
          管理者を変更する
        </Button>
      </div>
    </>
  );
  return <Modal open={isOpen} title="プロダクトの管理者を変更しますか？" emojiId="dizzy" onClose={onCloseModal} content={content} />;
};
