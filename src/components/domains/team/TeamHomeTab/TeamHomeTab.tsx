import React, { VFC, useState } from 'react';

import { SkeltonUserIcon, UserIcon } from '../../user/UserIcon';
import { Button, Card, Editor, Icon, MarkdownToHtmlBody } from '~/components/parts/commons';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { Team, User } from '~/domains';
import { restClient } from '~/utils/rest-client';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useTeam, useTeamUsers } from '~/stores/team';

type Props = {
  team: Team;
  editable: boolean;
  currentUser?: User | null;
};

export const TeamHomeTab: VFC<Props> = ({ team, editable, currentUser }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [content, setContent] = useState(team.homeContent);

  const { mutate: mutateTeam } = useTeam({ teamId: team._id });
  const { data: teamUsers } = useTeamUsers({ teamId: team._id });

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const handleCompleteEdit = async () => {
    try {
      await restClient.apiPut<Team>(`/teams/${team._id}`, {
        team: { homeContent: content },
      });

      mutateTeam();

      notifySuccessMessage('更新に成功しました!');
    } catch (error) {
      notifyErrorMessage('更新に失敗しました!');
    }
    setIsUpdate(false);
  };

  const handleClickCancelButton = () => {
    setContent(team.homeContent);
    setIsUpdate(false);
  };

  const handleClickUpdate = () => {
    setIsUpdate(true);
  };

  return (
    <>
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h3 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <Icon icon="FILE_WITH_EARMARK" size={24} />
          プロダクトについて
        </h3>
        {editable && (
          <Button onClick={handleClickUpdate} color="primary">
            <Icon icon="PENCIL" size={16} color="WHITE" />
            更新する
          </Button>
        )}
      </div>
      <div className="row">
        <div className="col-12 col-md-8 pb-4">
          <Card>
            {isUpdate && currentUser && (
              <Editor
                isUpdateMode
                content={content}
                onChangeContent={setContent}
                onCompleteEdit={handleCompleteEdit}
                onClickCancelButton={handleClickCancelButton}
                currentUser={currentUser}
              />
            )}
            {!isUpdate && (
              <div className="p-2">
                <MarkdownToHtmlBody content={content} />
              </div>
            )}
          </Card>
        </div>
        <div className="col-12 col-md-4">
          <TeamCard name={team.name} description={team.description} attachmentId={team.iconImageId} url={team.url} />
          <h5 className="mt-3 d-flex gap-1">
            <Icon icon="PEOPLE" size={24} color="BLACK" />
            プロダクトメンバー
          </h5>
          <div className="mt-2 d-flex gap-2">
            {teamUsers ? (
              teamUsers?.map((user) => {
                return <UserIcon key={user._id} attachmentId={user.iconImageId} userId={user._id} isLink size={56} />;
              })
            ) : (
              <SkeltonUserIcon size={40} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
