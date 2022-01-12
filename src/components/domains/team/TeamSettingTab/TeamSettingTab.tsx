import { useRouter } from 'next/router';
import React, { useEffect, useState, VFC } from 'react';
import { TeamForm } from '~/components/domains/team/TeamForm';
import { Button, Link } from '~/components/parts/commons';
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
  const router = useRouter();

  const [activeContent, setActiveContent] = useState('basic');

  useEffect(() => {
    if (!router) return;
    setActiveContent(router.query.content as string);
  }, [router]);

  const handleCreateInviteLink = async () => {
    try {
      const { data: invitationToken } = await restClient.apiPost<InvitationToken>('/invitation-tokens', {
        teamId: team._id,
      });

      const inviteLink = `${process.env.NEXT_PUBLIC_ROOT_URL}/${team.productId}/invite/${invitationToken.token}`;

      navigator.clipboard.writeText(inviteLink);
      notifySuccessMessage('招待リンクをコピーしました!');
    } catch (error) {
      notifyErrorMessage('招待リンクの作成に失敗しました!');
    }
  };
  return (
    <>
      <div className="row gy-3">
        <div className="list-group col-12 col-md-3">
          <Link href={URLS.TEAMS_SETTINGS(team.productId) + '?content=basic'}>
            <span className={`list-group-item list-group-item-action rounded ${activeContent === 'basic' && 'active'}`}>基本設定</span>
          </Link>
          <Link href={URLS.TEAMS_SETTINGS(team.productId) + '?content=team'}>
            <span className={`list-group-item list-group-item-action rounded ${activeContent === 'team' && 'active'}`}>チーム設定</span>
          </Link>
          {/* TODO */}
          {/* <a href="#" className="list-group-item list-group-item-action">
            重要な設定
          </a> */}
        </div>
        <div className="col-12 col-md-9">
          {activeContent === 'basic' && <TeamForm currentUser={currentUser} team={team} />}
          {activeContent === 'team' && (
            <Button color="primary" onClick={handleCreateInviteLink}>
              招待リンクを作成
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
