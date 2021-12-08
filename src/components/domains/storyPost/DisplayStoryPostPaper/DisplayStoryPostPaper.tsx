import React, { VFC, useState, useCallback, useMemo, useRef } from 'react';
import { Box, styled } from '@mui/system';
import { ListItemIcon, MenuItem } from '@mui/material';

import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

import { Emoji } from 'emoji-mart';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Icon,
  IconButton,
  Link,
  Dropdown,
  Editor,
  EmojiRadioGroup,
  Paper,
  MarkdownToHtmlBody,
  Typography,
  Divider,
  EmojiCountResult,
} from '~/components/parts/commons';
import { DeleteStoryPostModal } from '~/components/domains/storyPost/DeleteStoryPostModal';
import { Reaction, StoryPost } from '~/domains';
import 'github-markdown-css';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { restClient } from '~/utils/rest-client';
import { useStoryPosts } from '~/stores/storyPost';
import { COLORS, URLS } from '~/constants';
import { useScrollToTargetElement } from '~/hooks/useScrollToTargetElement';
import { useReactionsByStoryPostId } from '~/stores/reaction';

type Props = {
  createdUserId?: string;
  createdUserName?: string;
  storyPost: StoryPost & { currentUserReaction?: Reaction };
  emojiIds?: string[];
  teamId: string;
  storyId: string;
  page: number;
  editable?: boolean;
  isScrollTarget?: boolean;
};

export const DisplayStoryPostPaper: VFC<Props> = ({
  createdUserId,
  createdUserName,
  storyPost,
  emojiIds = ['disappointed_relieved', 'confused', 'slightly_smiling_face', 'smiling_face_with_3_hearts'],
  teamId,
  storyId,
  page,
  editable = false,
  isScrollTarget = false,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const [currentStoryPost, setCurrentStoryPost] = useState(storyPost);
  const [content, setContent] = useState(currentStoryPost.content);
  const [isUpdate, setIsUpdate] = useState(false);
  const [SelectedEmojiId, setSelectedEmojiId] = useState<string>(currentStoryPost.currentUserReaction?.emojiId || '');
  const [isOpenDeleteStoryPostModal, setIsOpenDeleteStoryPostModal] = useState(false);

  const { data: reactionsByStoryPostId = [] } = useReactionsByStoryPostId(storyPost._id);

  const emojisInfo: { emojiId: string; count: number }[] = useMemo(() => {
    // チーム外のメンバーの場合は表示しない
    if (!editable) return [];
    const confusedReactions = [];
    const disappointedRelievedReactions = [];
    const slightlySmilingFace = [];
    const smilingFaceWith3Hearts = [];
    reactionsByStoryPostId.forEach((v) => {
      if (v.emojiId === 'disappointed_relieved') disappointedRelievedReactions.push(v);
      if (v.emojiId === 'confused') confusedReactions.push(v);
      if (v.emojiId === 'slightly_smiling_face') slightlySmilingFace.push(v);
      if (v.emojiId === 'smiling_face_with_3_hearts') smilingFaceWith3Hearts.push(v);
    });
    return [
      {
        emojiId: 'confused',
        count: confusedReactions.length,
      },
      {
        emojiId: 'disappointed_relieved',
        count: disappointedRelievedReactions.length,
      },
      {
        emojiId: 'slightly_smiling_face',
        count: confusedReactions.length,
      },
      {
        emojiId: 'smiling_face_with_3_hearts',
        count: smilingFaceWith3Hearts.length,
      },
    ];
  }, [editable, reactionsByStoryPostId]);

  const { mutate: mutateStoryPosts } = useStoryPosts({
    storyId,
    page,
    limit: 10,
  });

  const displayDate = formatDistanceToNow(new Date(currentStoryPost.createdAt), { addSuffix: true, locale: ja });

  const handleClickCancelButton = () => {
    setContent(currentStoryPost.content);
    setIsUpdate(false);
  };

  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  useScrollToTargetElement({
    enabled: isScrollTarget,
    targetRef: boxRef,
    scrollYOffset: 90,
  });

  const handleCompleteEdit = async () => {
    try {
      await restClient.apiPut<StoryPost>(`/story-posts/${currentStoryPost._id}`, {
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

  const handlePostReaction = useCallback(
    async (emojiId: string) => {
      try {
        const result = await restClient.apiPost<Reaction>('/reactions', {
          reaction: {
            targetId: currentStoryPost._id,
            emojiId,
          },
        });

        setCurrentStoryPost({ ...currentStoryPost, currentUserReaction: result.data });

        setSelectedEmojiId(emojiId);
      } catch (error) {
        notifyErrorMessage('リアクションの送信に失敗しました!');
      }
    },
    [notifyErrorMessage, currentStoryPost, setCurrentStoryPost, setSelectedEmojiId],
  );

  const handleDeleteReaction = useCallback(
    async (reactionId: string) => {
      try {
        await restClient.apiDelete<Reaction>(`/reactions/${reactionId}`);

        setCurrentStoryPost({ ...currentStoryPost, currentUserReaction: undefined });

        setSelectedEmojiId('');
      } catch (error) {
        notifyErrorMessage('リアクションの取り消しに失敗しました!');
      }
    },
    [notifyErrorMessage, setCurrentStoryPost, currentStoryPost, setSelectedEmojiId],
  );

  const handlePutReaction = useCallback(
    async (emojiId: string, reactionId: string) => {
      try {
        const result = await restClient.apiPut<Reaction>(`/reactions/${reactionId}`, {
          reaction: {
            emojiId,
          },
        });
        setCurrentStoryPost({ ...currentStoryPost, currentUserReaction: result.data });
        setSelectedEmojiId(emojiId);
      } catch (error) {
        notifyErrorMessage('リアクションの更新に失敗しました!');
      }
    },
    [notifyErrorMessage, setCurrentStoryPost, currentStoryPost, setSelectedEmojiId],
  );

  const handleClickEmoji = useCallback(
    (emojiId: string) => {
      if (!currentStoryPost.currentUserReaction) {
        return handlePostReaction(emojiId);
      }

      if (SelectedEmojiId === emojiId) {
        return handleDeleteReaction(currentStoryPost.currentUserReaction._id);
      }

      handlePutReaction(emojiId, currentStoryPost.currentUserReaction._id);
    },
    [currentStoryPost, SelectedEmojiId, handlePostReaction, handleDeleteReaction, handlePutReaction],
  );

  const handleClickShareButton = useCallback(async () => {
    if (window != null) {
      const twitterUrl = new URL(
        `https://twitter.com/intent/tweet?url=${
          process.env.NEXT_PUBLIC_ROOT_URL + URLS.TEAMS_STORY(teamId, storyId, storyPost._id)
        }&hashtags=Proeco`,
      );
      window.open(twitterUrl.toString(), '_blank');
    }
  }, [storyId, storyPost._id, teamId]);

  return (
    <>
      <Paper>
        <StyledBox width="100%" display="flex" alignItems="center" ref={boxRef}>
          {createdUserId && createdUserName ? (
            <Link href={'/user/' + createdUserId}>{createdUserName}</Link>
          ) : (
            <Typography variant="body1">undefined</Typography>
          )}
          <StyledTime dateTime={new Date(currentStoryPost.createdAt).toLocaleDateString()}>{displayDate}</StyledTime>
          <WrapDropdown>
            <Dropdown
              toggle={<IconButton icon="MoreVert" width={20} />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <CopyToClipboard
                text={process.env.NEXT_PUBLIC_ROOT_URL + URLS.TEAMS_STORY(teamId, storyId, storyPost._id)}
                onCopy={() => notifySuccessMessage('共有リンクをコピーしました')}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Icon icon="Link" width="20px" color={COLORS.TEXT} />
                  </ListItemIcon>
                  共有リンク
                </MenuItem>
              </CopyToClipboard>
              <MenuItem onClick={handleClickShareButton}>
                <ListItemIcon>
                  <Icon icon="Twitter" width="20px" color="textColor.main" />
                </ListItemIcon>
                共有
              </MenuItem>
              {editable && (
                <>
                  <MenuItem onClick={handleClickUpdate}>
                    <ListItemIcon>
                      <Icon icon="Update" width="20px" color="textColor.main" />
                    </ListItemIcon>
                    更新する
                  </MenuItem>
                  <MenuItem onClick={() => setIsOpenDeleteStoryPostModal(true)}>
                    <ListItemIcon>
                      <Icon icon="Delete" width="20px" color={COLORS.ERROR} />
                    </ListItemIcon>
                    削除する
                  </MenuItem>
                </>
              )}
            </Dropdown>
          </WrapDropdown>
        </StyledBox>
        {isUpdate && (
          <Editor
            isUpdateMode
            content={content}
            onChangeContent={setContent}
            onCompleteEdit={handleCompleteEdit}
            onClickCancelButton={handleClickCancelButton}
          />
        )}
        {!isUpdate && (
          <>
            <Box p={2}>
              <MarkdownToHtmlBody content={content} />
            </Box>
            <Divider margin={20} />
            {editable ? (
              <>
                <Box display="flex" justifyContent="center">
                  <EmojiCountResult emojisInfo={emojisInfo} />
                </Box>
              </>
            ) : (
              <>
                <Box textAlign="center">
                  <Typography variant="caption" color={COLORS.TEXT_LIGHT}>
                    <Emoji emoji="bulb" size={12} />
                    リアクションを送信しましょう
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <EmojiRadioGroup emojiIds={emojiIds} selectedEmojiId={SelectedEmojiId} onClick={handleClickEmoji} />
                </Box>
              </>
            )}
          </>
        )}
      </Paper>
      <DeleteStoryPostModal
        isOpen={isOpenDeleteStoryPostModal}
        onCloseModal={() => setIsOpenDeleteStoryPostModal(false)}
        storyId={storyId}
        page={page}
        storyPostId={currentStoryPost._id}
      />
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
  color: ${(props) => props.theme.palette.textColor.light};
`;
