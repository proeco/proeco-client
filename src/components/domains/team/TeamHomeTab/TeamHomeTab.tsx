import React, { VFC, useState } from 'react';
import { Grid } from '@mui/material';
import { Button, Card, Editor, Icon, MarkdownToHtmlBody } from '~/components/parts/commons';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { Team, User } from '~/domains';
import { restClient } from '~/utils/rest-client';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useTeam } from '~/stores/team';

type Props = {
  team: Team;
  editable: boolean;
  currentUser?: User | null;
};

export const TeamHomeTab: VFC<Props> = ({ team, editable, currentUser }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [content, setContent] = useState(team.homeContent);

  const { mutate: mutateTeam } = useTeam({ teamId: team._id });

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
        <h2 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <Icon icon="FILE_WITH_EARMARK" size={28} />
          プロダクトについて
        </h2>
        {editable && (
          <Button onClick={handleClickUpdate} color="primary">
            <Icon icon="PENCIL" size={16} color="WHITE" />
            説明を更新する
          </Button>
        )}
      </div>
      <Grid container>
        <Grid item xs={12} sm={8} px={1} pb={2}>
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
        </Grid>
        <Grid item xs={12} sm={4} px={1} pb={2}>
          <TeamCard name={team.name} description={team.description} attachmentId={team.iconImageId} url={team.url} />
        </Grid>
      </Grid>
    </>
  );
};
