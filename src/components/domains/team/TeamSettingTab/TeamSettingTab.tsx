import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState, VFC } from 'react';
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

type Content = 'basic' | 'team' | 'delete';

export const TeamSettingTab: VFC<Props> = ({ currentUser, team }) => {
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();
  const router = useRouter();

  const [activeContent, setActiveContent] = useState<Content>('basic');

  useEffect(() => {
    if (!router.query.content) return;
    setActiveContent(router.query.content as Content);
  }, [router]);

  const handleClickSideMenu = (name: Content) => {
    setActiveContent(name);
    router.push(URLS.TEAMS_SETTINGS(team.productId) + `?content=${name}`);
  };

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

  const listItems: { content: Content; text: string }[] = useMemo(
    () => [
      { content: 'basic', text: '基本設定' },
      { content: 'team', text: 'メンバー設定' },
      { content: 'delete', text: 'プロダクトの削除' },
    ],
    [],
  );

  return (
    <>
      <div className="row gy-3">
        <div className="list-group col-12 col-md-3">
          {listItems.map((listItem, index) => {
            return (
              <span
                key={index}
                className={`c-pointer list-group-item list-group-item-action rounded ${activeContent === listItem.content && 'active'}`}
                onClick={() => handleClickSideMenu(listItem.content)}
              >
                {listItem.text}
              </span>
            );
          })}
        </div>
        <div className="col-12 col-md-9">
          {activeContent === 'basic' && <TeamForm currentUser={currentUser} team={team} />}
          {activeContent === 'team' && (
            // TODO チーム設定のコンテンツ部分を別componentにする
            <Button color="primary" onClick={handleCreateInviteLink}>
              招待リンクを作成
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
