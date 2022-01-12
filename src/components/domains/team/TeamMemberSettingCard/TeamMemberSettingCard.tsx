import React, { VFC } from 'react';
import { Button, Card } from '~/components/parts/commons';
import { InvitationToken, Team } from '~/domains';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { restClient } from '~/utils/rest-client';

type Props = {
  team: Team;
};

export const TeamMemberSettingCard: VFC<Props> = ({ team }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const handleCreateInviteLink = async () => {
    try {
      await restClient.apiPost<InvitationToken>('/invitation-tokens', {
        teamId: team._id,
      });

      notifySuccessMessage('招待リンクを作成しました!');
    } catch (error) {
      notifyErrorMessage('招待リンクの作成に失敗しました!');
    }
  };

  return (
    <Card>
      <Button color="primary" onClick={handleCreateInviteLink}>
        招待リンクを作成
      </Button>
      <div className="mt-4">
        <div className="mb-2 d-flex align-item-center">
          <input className="me-2 form-control border-0" readOnly value="https://proeco.app/productId/invite/aaaa" />
          <Button color="primary" outlined>
            コピー
          </Button>
        </div>
      </div>
    </Card>
  );
};
