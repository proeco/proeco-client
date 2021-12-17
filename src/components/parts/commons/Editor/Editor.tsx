import React, { VFC, useState, ChangeEvent } from 'react';
import { Box, styled } from '@mui/system';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { TextField, Button, Typography, MarkdownToHtmlBody, Icon } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { restClient } from '~/utils/rest-client';
import { Attachment } from '~/domains';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

type Props = {
  content: string;
  isUpdateMode?: boolean;
  onChangeContent: (content: string) => void;
  onCompleteEdit: () => void;
  onClickCancelButton?: () => void;
};

export const Editor: VFC<Props> = ({ content, isUpdateMode = false, onChangeContent, onCompleteEdit, onClickCancelButton }) => {
  const { data: currentUser } = useCurrentUser();

  const [value, setValue] = useState<'editor' | 'preview'>('editor');

  const { notifyErrorMessage } = useErrorNotification();

  const handleChange = (_event: React.SyntheticEvent, newValue: 'editor' | 'preview') => {
    setValue(newValue);
  };

  const onSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const params = new FormData();
    try {
      params.append('file', file);
      await restClient.apiPost<Attachment>(`/attachments?path=${currentUser?._id}/stories/`, params, {
        'Content-Type': 'multipart/form-data',
      });
    } catch (error) {
      notifyErrorMessage('画像のアップロードに失敗しました!');
    }
  };

  return (
    <Box>
      <TabContext value={value}>
        <StyledTabList onChange={handleChange} aria-label="Editor tabs">
          <StyledTab label="editor" value="editor" />
          <StyledTab label="preview" value="preview" />
        </StyledTabList>
        <StyledTabPanel value="editor">
          <Box my="16px">
            <TextField fullWidth multiline minRows={4} value={content} onChange={(e) => onChangeContent(e.target.value)} />
          </Box>
          <StyledLabel htmlFor="image">
            <Icon icon="Photo" />
            <StyledInput type="file" name="image" id="image" onChange={onSelectImage} accept="image/*" />
          </StyledLabel>
        </StyledTabPanel>
        <StyledTabPanel value="preview">
          {content === '' ? (
            <Box minHeight="112px" display="flex" p="16px" my="16px" alignItems="center" justifyContent="center">
              <Typography variant="body1">本文がありません</Typography>
            </Box>
          ) : (
            <Box minHeight="112px" p="16px" mt="8px" mb="24px">
              <MarkdownToHtmlBody content={content} />
            </Box>
          )}
        </StyledTabPanel>
      </TabContext>
      <Box display="flex" alignItems="center" justifyContent="flex-end" gap="4px">
        {isUpdateMode && (
          <Button variant="text" onClick={onClickCancelButton}>
            キャンセル
          </Button>
        )}
        <Button variant="contained" onClick={onCompleteEdit} disabled={content.trim() === ''}>
          {isUpdateMode ? '更新する' : '投稿する'}
        </Button>
      </Box>
    </Box>
  );
};

const StyledTabPanel = styled(TabPanel)`
  padding: 0px;
`;

const StyledTabList = styled(TabList)`
  min-height: unset;
`;

const StyledTab = styled(Tab)`
  padding: 8px;
  min-height: unset;
  min-width: unset;
`;

const StyledLabel = styled('label')`
  position: relative;
  display: block;
  width: 30px;
  cursor: pointer;
`;

const StyledInput = styled('input')`
  display: none;
`;
