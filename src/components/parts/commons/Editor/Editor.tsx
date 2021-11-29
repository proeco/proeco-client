import React, { VFC, useState } from 'react';
import { Box, styled } from '@mui/system';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { TextField, Button, Typography, MarkdownToHtmlBody } from '~/components/parts/commons';

type Props = {
  content: string;
  isUpdateMode?: boolean;
  onChangeContent: (content: string) => void;
  onCompleteEdit: () => void;
  onClickCancelButton?: () => void;
};

export const Editor: VFC<Props> = ({ content, isUpdateMode = false, onChangeContent, onCompleteEdit, onClickCancelButton }) => {
  const [value, setValue] = useState<'editor' | 'preview'>('editor');

  const handleChange = (_event: React.SyntheticEvent, newValue: 'editor' | 'preview') => {
    setValue(newValue);
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
