import React, { VFC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { addDays, format, isPast } from 'date-fns';

import { Button, Modal } from '~/components/parts/commons';
import { InvitationToken, Team, User } from '~/domains';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useInvitationTokens } from '~/stores/invitationToken';
import { restClient } from '~/utils/rest-client';
import { DATE_FORMAT } from '~/constants';

const TOKEN_LIMIT_DAYS = 7;

type Props = {
  team: Team;
  currentUser: User;
  isOpen: boolean;
  onCloseModal: () => void;
};

export const ManageInviteLinkModal: VFC<Props> = ({ team, currentUser, isOpen, onCloseModal }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const { data: InvitationTokens = [], mutate: mutateInvitationTokens } = useInvitationTokens({ teamId: team._id, page: 1, limit: 100 });

  const isAdminOfTeam = team.adminUserId === currentUser._id;

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

  const handleDeleteInviteLink = async (invitationToken: InvitationToken) => {
    try {
      await restClient.apiDelete<InvitationToken>(`/invitation-tokens/${invitationToken._id}`);
      await mutateInvitationTokens();
      notifySuccessMessage('招待リンクを削除しました!');
    } catch (error) {
      notifyErrorMessage('招待リンクの削除に失敗しました!');
    }
  };

  const content = (
    <>
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <Button color="primary" onClick={handleCreateInviteLink} disabled={!isAdminOfTeam}>
          招待リンクを作成
        </Button>
        <small className="fw-bold">※使用した招待リンクは破棄されます</small>
      </div>
      <div className="mt-4">
        {isAdminOfTeam &&
          InvitationTokens.map((invitationToken) => {
            const inviteLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/${team.productId}/invite/${invitationToken.token}`;
            const expirationDate = addDays(invitationToken.createdAt, TOKEN_LIMIT_DAYS);

            return (
              <div className="mb-3" key={invitationToken._id}>
                <div className="d-flex align-items-center gap-2">
                  <CopyToClipboard text={inviteLink} onCopy={() => notifySuccessMessage('招待リンクをコピーしました!')}>
                    <StyledInput
                      className={`form-control border-0 c-pointer ${isPast(expirationDate) ? 'text-danger' : ''}`}
                      readOnly
                      value={inviteLink}
                    />
                  </CopyToClipboard>
                  <Button color="danger" onClick={() => handleDeleteInviteLink(invitationToken)}>
                    削除
                  </Button>
                </div>
                <span>有効期限: {format(expirationDate, DATE_FORMAT.EXCEPT_SECOND)}</span>
              </div>
            );
          })}
      </div>
    </>
  );
  return <Modal content={content} emojiId="busts_in_silhouette" title="メンバーを招待する" open={isOpen} onClose={onCloseModal} />;
};

const StyledInput = styled.input`
  flex: 1;
`;
