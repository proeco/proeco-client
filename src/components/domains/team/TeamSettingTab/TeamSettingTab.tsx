import React, { VFC } from 'react';
import { TeamForm } from '~/components/domains/team/TeamForm';
import { Button } from '~/components/parts/commons';
import { URLS } from '~/constants';
import { InvitationToken, Team, User } from '~/domains';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { restClient } from '~/utils/rest-client';

type Props = {
  currentUser: User;
  team: Team;
};

export const TeamSettingTab: VFC<Props> = ({ currentUser, team }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();
  const handleCreateInviteLink = async () => {
    try {
      await restClient.apiPost<InvitationToken>('/invitation-tokens', {
        teamId: team._id,
      });

      notifySuccessMessage('招待リンクの作成に成功しました!');
    } catch (error) {
      notifyErrorMessage('招待リンクの作成に失敗しました!');
    }
  };
  return (
    <>
      <div className="row gy-3">
        <div className="list-group col-12 col-md-3">
          <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
            基本設定
          </a>
          <a href={URLS.TEAMS_SETTINGS(team.productId) + '?tab=team'} className="list-group-item list-group-item-action" aria-current="true">
            チーム設定
          </a>
          {/* TODO */}
          {/* <a href="#" className="list-group-item list-group-item-action">
            重要な設定
          </a> */}
        </div>
        <div className="col-12 col-md-9">
          <TeamForm currentUser={currentUser} team={team} />
          <Button color="primary" onClick={handleCreateInviteLink}>
            招待リンクを作成
          </Button>
        </div>
      </div>
    </>
  );
};
