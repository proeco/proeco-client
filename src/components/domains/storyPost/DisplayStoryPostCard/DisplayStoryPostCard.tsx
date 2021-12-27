import React, { VFC, useState, useCallback, useMemo, useRef } from 'react';
import { Box, styled } from '@mui/system';

import { Emoji } from 'emoji-mart';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Icon,
  Link,
  Dropdown,
  DropdownItem,
  Editor,
  EmojiRadioGroup,
  MarkdownToHtmlBody,
  EmojiCountResult,
  Card,
} from '~/components/parts/commons';
import { DeleteStoryPostModal } from '~/components/domains/storyPost/DeleteStoryPostModal';
import { Reaction, StoryPost, User } from '~/domains';
import 'github-markdown-css';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { restClient } from '~/utils/rest-client';
import { useStoryPosts } from '~/stores/storyPost';
import { URLS } from '~/constants';
import { useScrollToTargetElement } from '~/hooks/useScrollToTargetElement';
import { useReactionsByStoryPostId } from '~/stores/reaction';
import { formatDistanceToNow } from '~/utils/formatDistanceToNow';
import { LoginModal } from '~/components/parts/authentication/LoginModal';

type Props = {
  createdUserId?: string;
  createdUserName?: string;
  storyPost: StoryPost & { currentUserReaction?: Reaction };
  emojiIds?: string[];
  teamId: string;
  productId: string;
  storyId: string;
  page: number;
  editable?: boolean;
  isScrollTarget?: boolean;
  currentUser?: User | null;
};

export const DisplayStoryPostCard: VFC<Props> = ({
  createdUserId,
  createdUserName,
  storyPost,
  emojiIds = ['disappointed_relieved', 'confused', 'slightly_smiling_face', 'smiling_face_with_3_hearts'],
  teamId,
  productId,
  storyId,
  page,
  editable = false,
  isScrollTarget = false,
  currentUser,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const [currentStoryPost, setCurrentStoryPost] = useState(storyPost);
  const [content, setContent] = useState(currentStoryPost.content);
  const [isUpdate, setIsUpdate] = useState(false);
  const [SelectedEmojiId, setSelectedEmojiId] = useState<string>(currentStoryPost.currentUserReaction?.emojiId || '');
  const [isOpenDeleteStoryPostModal, setIsOpenDeleteStoryPostModal] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { data: reactionsByStoryPostId = [] } = useReactionsByStoryPostId(storyPost._id);

  const emojisInfo: { emojiId: string; count: number }[] = useMemo(() => {
    // チーム外のメンバーの場合は表示しない
    if (!editable) return [];
    const countByEmojiId = reactionsByStoryPostId.reduce(
      (acc: { [key: string]: number }, reaction) => {
        // emojiId が存在する時だけCount
        if (reaction.emojiId) {
          acc[reaction.emojiId] = ++acc[reaction.emojiId];
        }
        return acc;
      },
      { disappointed_relieved: 0, confused: 0, slightly_smiling_face: 0, smiling_face_with_3_hearts: 0 } as { [key: string]: number },
    );

    return Object.entries(countByEmojiId).map(([emojiId, count]) => {
      return { emojiId, count };
    });
  }, [editable, reactionsByStoryPostId]);

  const { mutate: mutateStoryPosts } = useStoryPosts({
    storyId,
    page,
    limit: 100,
  });

  const displayDate = formatDistanceToNow(currentStoryPost.createdAt);

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
      if (!currentUser) {
        notifySuccessMessage('ログインが必要です！');
        return setIsLoginModalOpen(true);
      }
      if (!currentStoryPost.currentUserReaction) {
        return handlePostReaction(emojiId);
      }

      if (SelectedEmojiId === emojiId) {
        return handleDeleteReaction(currentStoryPost.currentUserReaction._id);
      }

      handlePutReaction(emojiId, currentStoryPost.currentUserReaction._id);
    },
    [
      currentUser,
      currentStoryPost.currentUserReaction,
      SelectedEmojiId,
      handlePutReaction,
      notifySuccessMessage,
      handlePostReaction,
      handleDeleteReaction,
    ],
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
      <Card>
        <StyledBox width="100%" display="flex" alignItems="center" ref={boxRef}>
          {createdUserId && createdUserName ? <Link href={'/user/' + createdUserId}>{createdUserName}</Link> : <span>undefined</span>}
          <StyledTime className="ms-1" dateTime={currentStoryPost.createdAt.toLocaleDateString()}>
            {displayDate}
          </StyledTime>
          <WrapDropdown>
            <Dropdown toggle={<Icon icon="THREE_DOTS_VERTICAL" size={20} />}>
              <CopyToClipboard
                text={process.env.NEXT_PUBLIC_ROOT_URL + URLS.TEAMS_STORY(productId, storyId, storyPost._id)}
                onCopy={() => notifySuccessMessage('共有リンクをコピーしました')}
              >
                <DropdownItem>
                  <Icon icon="LINK" size={20} />
                  <span className="ms-2">共有リンク</span>
                </DropdownItem>
              </CopyToClipboard>
              <DropdownItem onClick={handleClickShareButton}>
                <Icon icon="TWITTER" size={20} color="PRIMARY" />
                <span className="ms-2">共有</span>
              </DropdownItem>
              {editable && (
                <DropdownItem onClick={handleClickUpdate}>
                  <Icon icon="CLOCKWISE" size={20} />
                  <span className="ms-2">更新する</span>
                </DropdownItem>
              )}
              {editable && (
                <DropdownItem onClick={() => setIsOpenDeleteStoryPostModal(true)}>
                  <Icon icon="TRASH" size={20} color="DANGER" />
                  <span className="ms-2">削除する</span>
                </DropdownItem>
              )}
            </Dropdown>
          </WrapDropdown>
        </StyledBox>
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
          <>
            <Box p={2}>
              <MarkdownToHtmlBody content={content} />
            </Box>
            <hr className="my-3 text-light" />
            {editable ? (
              <>
                <Box textAlign="center">
                  <span className="fs-3 text-light">
                    <Emoji emoji="bulb" size={12} />
                    ユーザーからリアクションが届いています
                  </span>
                </Box>
                <Box display="flex" justifyContent="center">
                  <EmojiCountResult emojisInfo={emojisInfo} />
                </Box>
              </>
            ) : (
              <>
                <Box textAlign="center">
                  <span className="fs-3 text-light">
                    <Emoji emoji="bulb" size={12} />
                    リアクションを送信しましょう
                  </span>
                </Box>
                <Box display="flex" justifyContent="center">
                  <EmojiRadioGroup emojiIds={emojiIds} selectedEmojiId={SelectedEmojiId} onClick={handleClickEmoji} />
                </Box>
              </>
            )}
          </>
        )}
      </Card>
      <DeleteStoryPostModal
        isOpen={isOpenDeleteStoryPostModal}
        onCloseModal={() => setIsOpenDeleteStoryPostModal(false)}
        storyId={storyId}
        page={page}
        storyPostId={currentStoryPost._id}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
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
