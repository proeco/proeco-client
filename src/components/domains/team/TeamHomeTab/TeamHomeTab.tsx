import React, { VFC, useState } from 'react';
import { Box, Grid, MenuItem, ListItemIcon, styled } from '@mui/material';
import { Dropdown, Editor, Icon, IconButton, MarkdownToHtmlBody, Paper } from '~/components/parts/commons';
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
    <Grid container>
      <Grid key={team._id} item xs={12} sm={8} px={1} pb={2}>
        <Paper>
          {editable && (
            <WrapDropdown>
              <Dropdown
                toggle={<IconButton icon="MoreVert" width={20} />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleClickUpdate} key="update">
                  <ListItemIcon>
                    <Icon icon="Update" width="20px" color="textColor.main" />
                  </ListItemIcon>
                  更新する
                </MenuItem>
              </Dropdown>
            </WrapDropdown>
          )}
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
            <Box p={2}>
              <MarkdownToHtmlBody content={content} />
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid key={team._id} item xs={12} sm={4} px={1} pb={2}>
        <TeamCard name={team.name} productId={team.productId} description={team.description} attachmentId={team.iconImageId} url={team.url} />
      </Grid>
    </Grid>
  );
};

const WrapDropdown = styled(Box)`
  margin-left: auto;
  width: fit-content;
`;
