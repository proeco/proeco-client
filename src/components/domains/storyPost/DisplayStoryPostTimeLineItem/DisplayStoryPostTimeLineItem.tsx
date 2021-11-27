import React, { VFC } from 'react';
import { Box, styled } from '@mui/system';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { IconButton, Link, Typography } from '~/components/parts/commons';
import { StoryPost, User } from '~/domains';
import 'github-markdown-css';

type Props = {
  currentUser: User;
  storyPost: StoryPost;
};

export const DisplayStoryPostTimeLineItem: VFC<Props> = ({ currentUser, storyPost }) => {
  return (
    <Box width="100%">
      <StyledBox width="100%" display="flex" alignItems="center" mb="12px">
        <Link href={'/user/' + currentUser._id}>{currentUser.name}</Link>
        <Typography variant="caption">{storyPost.createdAt.toLocaleDateString()}</Typography>
        <StyledIconButton icon="MoreVert" width={20} />
      </StyledBox>
      <StyledMarkdownBody className="markdown-body">
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
          {storyPost.content}
        </ReactMarkdown>
      </StyledMarkdownBody>
    </Box>
  );
};

const StyledBox = styled(Box)`
  .MuiLink-root {
    color: ${(props) => props.theme.palette.textColor.main};
    margin-right: 8px;
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: auto;
`;

const StyledMarkdownBody = styled(Box)`
  &.markdown-body {
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
  }
`;
