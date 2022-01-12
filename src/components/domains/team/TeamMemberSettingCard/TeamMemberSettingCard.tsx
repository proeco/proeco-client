import React, { VFC } from 'react';
import { Button, Card } from '~/components/parts/commons';
import { InvitationToken, Team } from '~/domains';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useInvitationTokens } from '~/stores/invitationToken';
import { restClient } from '~/utils/rest-client';

type Props = {
  team: Team;
};

export const TeamMemberSettingCard: VFC<Props> = ({ team }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: InvitationTokens = [], mutate: mutateInvitationTokens } = useInvitationTokens({ teamId: team._id, page: 1, limit: 100 });

  const handleCreateInviteLink = async () => {
    try {
      await restClient.apiPost<InvitationToken>('/invitation-tokens', {
        teamId: team._id,
      });

      await mutateInvitationTokens();

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
        {InvitationTokens.map((invitationToken) => {
          const inviteLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/${team.productId}/invite/${invitationToken.token}`;
          const handleCopyInviteLink = () => {
            navigator.clipboard.writeText(inviteLink);
            notifySuccessMessage('招待リンクをコピーしました!');
          };
          return (
            <div className="mb-3 d-flex align-item-center" key={invitationToken._id}>
              <input className="me-2 form-control border-0" readOnly value={inviteLink} />
              <Button color="primary" outlined onClick={handleCopyInviteLink}>
                コピー
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
