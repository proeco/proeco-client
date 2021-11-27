import React, { VFC, useState, MouseEvent } from 'react';
import { Box, styled } from '@mui/system';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Icon, IconButton, Link, Menu, Typography, Editor } from '~/components/parts/commons';
import { StoryPost, User } from '~/domains';
import 'github-markdown-css';

type Props = {
  currentUser: User;
  storyPost: StoryPost;
};

export const DisplayStoryPostTimeLineItem: VFC<Props> = ({ currentUser, storyPost }) => {
  const [content, setContent] = useState(storyPost.content);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isUpdate, setIsUpdate] = useState(false);

  const handleClickCancelButton = () => {
    setContent(storyPost.content);
    setIsUpdate(false);
  };

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCompleteEdit = () => {
    // TODO: storyPostを更新できるようにする
    setIsUpdate(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpdate = () => {
    setIsUpdate(true);
    handleClose();
  };

  const menuItems = [
    {
      icon: <Icon icon="Update" width="20px" color="textColor.main" />,
      text: '更新する',
      onClick: handleClickUpdate,
    },
  ];

  return (
    <Box width="100%">
      <StyledBox width="100%" display="flex" alignItems="center" mb="12px">
        <Link href={'/user/' + currentUser._id}>{currentUser.name}</Link>
        <Typography variant="caption">{storyPost.createdAt.toLocaleDateString()}</Typography>
        <StyledIconButton icon="MoreVert" width={20} onClick={(e) => handleClickMenu(e)} />
        <Menu onClick={(e) => e.stopPropagation()} anchorEl={anchorEl} open={open} menuItems={menuItems} onClose={handleClose} />
      </StyledBox>
      {isUpdate ? (
        <Editor isUpdateMode content={content} onChangeContent={setContent} onCompleteEdit={handleCompleteEdit} onClickCancelButton={handleClickCancelButton} />
      ) : (
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
            {content}
          </ReactMarkdown>
        </StyledMarkdownBody>
      )}
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
