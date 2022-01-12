import { useState, VFC, useEffect } from 'react';
import { Button, Card, Icon } from '~/components/parts/commons';
import { Team } from '~/domains';

type Props = {
  team: Team;
};

export const DeleteTeamCard: VFC<Props> = ({ team }) => {
  const [disabledDeleteButton, setDisabledDeleteButton] = useState(true);
  const [productNameForConfirm, setProductNameForConfirm] = useState('');

  useEffect(() => {
    setDisabledDeleteButton(productNameForConfirm !== team.name);
  }, [productNameForConfirm, team.name]);

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
      <Button color="danger" disabled={disabledDeleteButton} onClick={() => void 0}>
        プロダクトを削除する
      </Button>
    </Card>
  );
};
