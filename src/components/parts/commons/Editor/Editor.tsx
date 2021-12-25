import React, { VFC, useState, ChangeEvent, useRef } from 'react';
import { Box, styled } from '@mui/system';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { TextField, Button, MarkdownToHtmlBody, Icon } from '~/components/parts/commons';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { restClient } from '~/utils/rest-client';
import { Attachment, User } from '~/domains';

type Props = {
  content: string;
  isUpdateMode?: boolean;
  onChangeContent: (content: string) => void;
  onCompleteEdit: () => void;
  onClickCancelButton?: () => void;
  currentUser: User;
};

export const Editor: VFC<Props> = ({ content, isUpdateMode = false, onChangeContent, onCompleteEdit, onClickCancelButton, currentUser }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<'editor' | 'preview'>('editor');

  const { notifyErrorMessage } = useErrorNotification();

  const handleChange = (_event: React.SyntheticEvent, newValue: 'editor' | 'preview') => {
    setValue(newValue);
  };

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !inputRef.current) {
      return;
    }
    const file = e.target.files[0];
    const params = new FormData();
    params.append('file', file);
    try {
      const { data: attachment } = await restClient.apiPost<Attachment>(`/attachments?path=${currentUser._id}/stories`, params, {
        'Content-Type': 'multipart/form-data',
      });
      const selectionStart = inputRef.current.selectionStart;
      const before = content.substring(0, selectionStart);
      const after = content.substring(selectionStart, content.length);

      onChangeContent(`${before}![](${attachment.filePath})${after}`);
      e.target.value = '';
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
            <TextField
              inputRef={inputRef}
              fullWidth
              multiline
              minRows={10}
              value={content}
              onChange={(e) => onChangeContent(e.target.value)}
            />
          </Box>
        </StyledTabPanel>
        <StyledTabPanel value="preview">
          {content === '' ? (
            <Box minHeight="112px" display="flex" p="16px" my="16px" alignItems="center" justifyContent="center">
              <p className="mb-0">本文がありません</p>
            </Box>
          ) : (
            <Box minHeight="112px" p="16px" mt="8px" mb="24px">
              <MarkdownToHtmlBody content={content} />
            </Box>
          )}
        </StyledTabPanel>
      </TabContext>
      <Box display="flex" alignItems="center" justifyContent="flex-end" gap="4px">
        {value === 'editor' && (
          <StyledLabel htmlFor="image">
            <Icon icon="CLOUD_UPLOAD" size={20} />
            <span className="fs-2 text-light">画像をアップロード</span>
            <StyledInput type="file" name="image" id="image" onChange={handleUploadFile} accept="image/*" />
          </StyledLabel>
        )}
        {isUpdateMode && onClickCancelButton && (
          <Button outlined color="secondary" onClick={onClickCancelButton}>
            キャンセル
          </Button>
        )}
        <Button color="primary" onClick={onCompleteEdit} disabled={content.trim() === ''}>
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
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  margin-right: auto;
  cursor: pointer;
  &:hover {
    span {
      color: ${(props) => props.theme.palette.primary.main};
    }
    .MuiSvgIcon-root {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const StyledInput = styled('input')`
  display: none;
`;
