import React, { VFC, useState } from 'react';
import { Box, styled } from '@mui/system';
import { ListItemIcon, MenuItem } from '@mui/material';

import { formatDistanceToNow } from 'date-fns';
import ja from 'date-fns/locale/ja';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Icon, IconButton, Link, Dropdown, Editor, EmojiRadioGroup, Paper } from '~/components/parts/commons';
import { StoryPost, User } from '~/domains';
import 'github-markdown-css';

type Props = {
  currentUser: User;
  storyPost: StoryPost;
  emojiIds?: string[];
};

export const DisplayStoryPostPaper: VFC<Props> = ({ currentUser, storyPost, emojiIds = ['thumbsup', 'heart', 'laughing', 'partying_face'] }) => {
  const [content, setContent] = useState(storyPost.content);

  const [isUpdate, setIsUpdate] = useState(false);

  const [SelectedEmojiId, setSelectedEmojiId] = useState(emojiIds[0]);

  const displayDate = formatDistanceToNow(storyPost.createdAt, { addSuffix: true, locale: ja });

  const handleClickCancelButton = () => {
    setContent(storyPost.content);
    setIsUpdate(false);
  };

  const handleCompleteEdit = () => {
    // TODO: storyPostを更新できるようにする
    setIsUpdate(false);
  };

  const handleClickUpdate = () => {
    setIsUpdate(true);
  };

  const handleClickEmoji = (id: string) => {
    // TODO: 絵文字を送信するapiを叩く
    setSelectedEmojiId(id);
  };

  return (
    <Paper>
      <StyledBox width="100%" display="flex" alignItems="center" mb="12px">
        <Link href={'/user/' + currentUser._id}>{currentUser.name}</Link>
        <StyledTime dateTime={storyPost.createdAt.toLocaleDateString()}>{displayDate}</StyledTime>
        <WrapDropdown>
          <Dropdown
            toggle={<IconButton icon="MoreVert" width={20} />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleClickUpdate}>
              <ListItemIcon>
                <Icon icon="Update" width="20px" color="textColor.main" />
              </ListItemIcon>
              更新する
            </MenuItem>
          </Dropdown>
        </WrapDropdown>
      </StyledBox>
      {isUpdate ? (
        <Editor isUpdateMode content={content} onChangeContent={setContent} onCompleteEdit={handleCompleteEdit} onClickCancelButton={handleClickCancelButton} />
      ) : (
        <>
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
          <EmojiRadioGroup emojiIds={emojiIds} selectedEmojiId={SelectedEmojiId} onClick={handleClickEmoji} />
        </>
      )}
    </Paper>
  );
};

const StyledBox = styled(Box)`
  .MuiLink-root {
    color: ${(props) => props.theme.palette.textColor.main};
    margin-right: 8px;
  }
`;

const WrapDropdown = styled(Box)`
  margin-left: auto;
`;

const StyledTime = styled('time')`
  font-size: 12px;
  color: ${(props) => props.theme.palette.textColor.main};
`;

const StyledMarkdownBody = styled(Box)`
  margin-bottom: 20px;
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
