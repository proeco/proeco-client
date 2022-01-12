import { useRouter } from 'next/router';
import { useState, VFC, useEffect, useCallback } from 'react';
import { restClient } from '~/utils/rest-client';

import { Team } from '~/domains';
import { Button, Card, Icon } from '~/components/parts/commons';

import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { URLS } from '~/constants';

type Props = {
  team: Team;
};

export const DeleteTeamCard: VFC<Props> = ({ team }) => {
  const router = useRouter();

  const [disabledDeleteButton, setDisabledDeleteButton] = useState(true);
  const [productNameForConfirm, setProductNameForConfirm] = useState('');

  const { notifyErrorMessage } = useErrorNotification();
  const { notifySuccessMessage } = useSuccessNotification();

  useEffect(() => {
    setDisabledDeleteButton(productNameForConfirm !== team.name);
  }, [productNameForConfirm, team.name]);

  const handleSubmitDeleteButton = useCallback(async () => {
    setDisabledDeleteButton(true);
    try {
      await restClient.apiDelete(`/teams/${team?._id}`);
      notifySuccessMessage('プロダクトの削除に成功しました');
      router.push(URLS.TOP);
    } catch (error) {
      setDisabledDeleteButton(false);
      notifyErrorMessage('プロダクトの削除に失敗しました');
    }
  }, [notifyErrorMessage, notifySuccessMessage, router, team?._id]);

  return (
    <Card>
      <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <Icon icon="TRASH" size={24} />
        プロダクトを削除する
        <p className="text-danger fs-2 mb-1">※ 一度削除したプロダクトはもとに戻せません</p>
      </h3>
      <p className="fs-2 mb-1">プロダクト名を入力してください</p>
      <input
        className="form-control mb-3"
        placeholder={team.name}
        value={productNameForConfirm}
        onChange={(e) => setProductNameForConfirm(e.target.value)}
      />
      <Button color="danger" disabled={disabledDeleteButton} onClick={handleSubmitDeleteButton}>
        プロダクトを削除する
      </Button>
    </Card>
  );
};
