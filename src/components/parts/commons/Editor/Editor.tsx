import React, { VFC, useState } from 'react';
import { Box, styled } from '@mui/system';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import 'github-markdown-css';

import { TextField, Button, Typography } from '~/components/parts/commons';

type Props = {
  content: string;
  onPostContent: () => void;
};

export const Editor: VFC<Props> = ({ content, onPostContent }) => {
  const [value, setValue] = useState<'editor' | 'preview'>('editor');
  const [markdownContent, setMarkdownContent] = useState(content);

  const handleChange = (event: React.SyntheticEvent, newValue: 'editor' | 'preview') => {
    setValue(newValue);
  };

  return (
    <Box bgcolor="white" p="12px 16px 16px">
      <TabContext value={value}>
        <StyledTabList onChange={handleChange} aria-label="Editor tabs">
          <StyledTab label="editor" value="editor" />
          <StyledTab label="preview" value="preview" />
        </StyledTabList>
        <StyledTabPanel value="editor">
          <Box py="16px">
            <TextField fullWidth multiline minRows={4} value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} />
          </Box>
        </StyledTabPanel>
        <StyledTabPanel value="preview">
          {markdownContent === '' ? (
            <Box minHeight="112px" display="flex" p="16px" alignItems="center" justifyContent="center">
              <Typography variant="body1">本文がありません</Typography>
            </Box>
          ) : (
            <StyledMarkdownBody minHeight="112px" className="markdown-body" p="16px">
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
                plugins={[gfm]}
                unwrapDisallowed={false}
              >
                {markdownContent}
              </ReactMarkdown>
            </StyledMarkdownBody>
          )}
        </StyledTabPanel>
      </TabContext>
      <StyledButton variant="contained" onClick={onPostContent}>
        投稿する
      </StyledButton>
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

const StyledMarkdownBody = styled(Box)`
  color: ${(props) => props.theme.palette.textColor.main};
  background-color: #fff;
  p {
    white-space: pre-wrap;
  }
  pre {
    background-color: rgb(30, 30, 30);
  }
  code {
    color: #fff;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;
`;
