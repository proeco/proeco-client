import React, { VFC, useState } from 'react';
import { Box, styled } from '@mui/system';
import { ListItemIcon, MenuItem } from '@mui/material';

import { formatDistanceToNow } from 'date-fns';
import ja from 'date-fns/locale/ja';

import { Icon, IconButton, Link, Dropdown, Editor, EmojiRadioGroup, Paper, MarkdownToHtmlBody } from '~/components/parts/commons';
import { DeleteStoryPostModal } from '~/components/domains/storyPost/DeleteStoryPostModal';
import { StoryPost, User } from '~/domains';
import 'github-markdown-css';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { restClient } from '~/utils/rest-client';
import { useStoryPosts } from '~/stores/storyPost';

type Props = {
  currentUser: User;
  storyPost: StoryPost;
  emojiIds?: string[];
  storyId: string;
  page: number;
};

export const DisplayStoryPostPaper: VFC<Props> = ({
  currentUser,
  storyPost,
  emojiIds = ['thumbsup', 'heart', 'laughing', 'partying_face'],
  storyId,
  page,
}) => {
  const [content, setContent] = useState(storyPost.content);

  const [isUpdate, setIsUpdate] = useState(false);

  const [SelectedEmojiId, setSelectedEmojiId] = useState(emojiIds[0]);

  const [open, setOpen] = useState(false);

  const { mutate: mutateStoryPosts } = useStoryPosts({
    storyId,
    page,
    limit: 10,
  });

  const displayDate = formatDistanceToNow(new Date(storyPost.createdAt), { addSuffix: true, locale: ja });

  const handleClickCancelButton = () => {
    setContent(storyPost.content);
    setIsUpdate(false);
  };

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  const handleCompleteEdit = async () => {
    try {
      await restClient.apiPut<StoryPost>(`/story-posts/${storyPost._id}`, {
        storyPost: { content },
      });

      mutateStoryPosts();

      notifySuccessMessage('更新に成功しました!');
    } catch (error) {
      notifyErrorMessage('更新に失敗しました!');
    }
    setIsUpdate(false);
  };

  const handleClickUpdate = () => {
    setIsUpdate(true);
  };

  const handleClickDelete = () => {
    setOpen(true);
  };

  const handleClickEmoji = (id: string) => {
    // TODO: 絵文字を送信するapiを叩く
    setSelectedEmojiId(id);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper>
        <StyledBox width="100%" display="flex" alignItems="center" mb="12px">
          <Link href={'/user/' + currentUser._id}>{currentUser.name}</Link>
          <StyledTime dateTime={new Date(storyPost.createdAt).toLocaleDateString()}>{displayDate}</StyledTime>
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
              <MenuItem onClick={handleClickDelete}>
                <ListItemIcon>
                  <Icon icon="Delete" width="20px" color="textColor.main" />
                </ListItemIcon>
                削除する
              </MenuItem>
            </Dropdown>
          </WrapDropdown>
        </StyledBox>
        {isUpdate ? (
          <Editor
            isUpdateMode
            content={content}
            onChangeContent={setContent}
            onCompleteEdit={handleCompleteEdit}
            onClickCancelButton={handleClickCancelButton}
          />
        ) : (
          <>
            <Box mb="16px">
              <MarkdownToHtmlBody content={content} />
            </Box>
            <EmojiRadioGroup emojiIds={emojiIds} selectedEmojiId={SelectedEmojiId} onClick={handleClickEmoji} />
          </>
        )}
      </Paper>
      <DeleteStoryPostModal isOpen={open} onCloseModal={handleCloseModal} storyId={storyId} page={page} storyPostId={storyPost._id} />
    </>
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
