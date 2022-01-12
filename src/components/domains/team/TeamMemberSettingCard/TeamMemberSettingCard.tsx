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
    </Card>
  );
};
