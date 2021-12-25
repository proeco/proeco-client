import React, { ReactNode, useMemo, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';

import Reward, { RewardElement } from 'react-rewards';

import { Box, styled } from '@mui/system';
import { Grid, ListItemIcon, MenuItem } from '@mui/material';
import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { COLORS, URLS } from '~/constants';

import { useStory } from '~/stores/story/useStory';
import { useStoryPosts } from '~/stores/storyPost';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useReactionsByUserId } from '~/stores/reaction';
import { useTeamUsers } from '~/stores/team';

import { Button, Emoji, FixedImage, Icon, IconButton, Paper, TimeLineItem } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { CreateNewStoryPostPaper } from '~/components/domains/storyPost/CreateNewStoryPostPaper/CreateNewStoryPostPaper';
import { Dropdown } from '~/components/parts/commons/Dropdown';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { DisplayStoryPostPaper } from '~/components/domains/storyPost/DisplayStoryPostPaper';
import { Attachment, Reaction, StoryPost, Team } from '~/domains';
import { UpdateStoryModal } from '~/components/domains/story/UpdateStoryModal';
import { DeleteStoryModal } from '~/components/domains/story/DeleteStoryModal';
import { Breadcrumbs } from '~/components/parts/commons/Breadcrumbs';
import { PaginationResult } from '~/interfaces';

import { useErrorNotification } from '~/hooks/useErrorNotification';

type Props = {
  storyFromServerSide: Story;
  team: Team;
  teamIconAttachment: Attachment;
};

const StoryPage: ProecoNextPage<Props> = ({ storyFromServerSide, team, teamIconAttachment }) => {
  const router = useRouter();
  const closeButtonRef = useRef<RewardElement>(null);

  const { notifyErrorMessage } = useErrorNotification();

  const [isOpenUpdateStoryModal, setIsOpenUpdateStoryModal] = useState(false);
  const [isOpenDeleteStoryModal, setIsOpenDeleteStoryModal] = useState(false);
  const storyId = storyFromServerSide._id;
  const storyPostId = router.query.storyPostId as string;

  const { data: story, mutate: mutateStory } = useStory(storyId, storyFromServerSide);
  const { data: currentUser } = useCurrentUser();
  const { data: teamUsers = [] } = useTeamUsers({ teamId: team._id });

  const isMemberOfTeam = useMemo(() => {
    return !!currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id);
  }, [currentUser, teamUsers]);

  const { data: reactions = [] } = useReactionsByUserId(currentUser?._id);

  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: storyPosts = [] } = useStoryPosts({
    storyId,
    page,
    limit: 100,
  });

  const customStoryPosts: Array<StoryPost & { currentUserReaction?: Reaction }> = useMemo(() => {
    return storyPosts.map((s) => {
      return {
        ...s,
        currentUserReaction: reactions.find((r) => r.targetId === s._id),
      };
    });
  }, [storyPosts, reactions]);

  const handleClickUpdate = () => {
    setIsOpenUpdateStoryModal(true);
  };

  const handleClickDelete = () => {
    setIsOpenDeleteStoryModal(true);
  };

  const handleClickIsCompletedButton = useCallback(async () => {
    if (!story) return;
    try {
      if (!story.isCompleted) {
        closeButtonRef.current?.rewardMe();
      }

      await restClient.apiPut<Story>(`/stories/${story._id}`, {
        newObject: { isCompleted: !story.isCompleted },
      });

      mutateStory();
    } catch (error) {
      notifyErrorMessage('ストーリーのCloseに失敗しました!');
    }
  }, [mutateStory, notifyErrorMessage, story]);

  const menuItems = [
    {
      icon: <Icon icon="Update" width="20px" color="textColor.main" />,
      text: '更新する',
      onClick: handleClickUpdate,
    },
    {
      icon: <Icon icon="Delete" width="20px" color={COLORS.ERROR} />,
      text: '削除する',
      onClick: handleClickDelete,
    },
  ];

  const ogpUrl = useMemo(
    () =>
      story
        ? `https://proeco-ogp.vercel.app/api/ogp?title=${story.title}&teamName=${team.name}&teamIconUrl=${teamIconAttachment.filePath}`
        : '',
    [story, team.name, teamIconAttachment],
  );

  const handleClickShareButton = useCallback(async () => {
    if (window != null) {
      const twitterUrl = new URL(
        `https://twitter.com/intent/tweet?url=${
          process.env.NEXT_PUBLIC_ROOT_URL + URLS.TEAMS_STORY(team.productId, storyId)
        }&hashtags=Proeco`,
      );
      window.open(twitterUrl.toString(), '_blank');
    }
  }, [storyId, team.productId]);

  if (!story || !storyPosts) {
    return null;
  }

  return (
    <>
      <ProecoOgpHead title={story.title} image={ogpUrl} url={`${process.env.NEXT_PUBLIC_ROOT_URL}/${team.productId}/story/${story._id}`} />
      <Box mx="auto" maxWidth="1200px">
        <Breadcrumbs breadcrumbsItems={[{ url: `${URLS.TEAMS(team.productId)}#story`, label: 'ストーリーリスト' }, { label: story.title }]} />
        <Box mt={1} mb={4} display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="16px">
            <Emoji emojiId={story.emojiId} size={40} />
            <h1 className="fw-bold mb-0 d-flex align-items-center gap-2">{story.title}</h1>
          </Box>
          {isMemberOfTeam && (
            <Dropdown
              toggle={<Icon icon="MoreVert" width={24} />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {menuItems.map((menuItem, i) => (
                <MenuItem key={i} onClick={menuItem.onClick}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  {menuItem.text}
                </MenuItem>
              ))}
            </Dropdown>
          )}
        </Box>
        <Grid container>
          <Grid item xs={12} md={8} px={2} pb={3}>
            {customStoryPosts.map((customStoryPost, i) => {
              const createdStoryPostUser = teamUsers.find((teamUser) => teamUser._id === customStoryPost.createdUserId);
              return (
                <TimeLineItem
                  key={customStoryPost._id}
                  userAttachmentId={createdStoryPostUser?.iconImageId}
                  userId={customStoryPost.createdUserId}
                  // customStoryPostが最後の要素ではないか、またはCurrentUserがチームに属しているときにtrue
                  isConnect={i !== customStoryPosts.length - 1 || isMemberOfTeam}
                >
                  <DisplayStoryPostPaper
                    createdUserId={createdStoryPostUser?._id}
                    createdUserName={createdStoryPostUser?.name}
                    storyPost={customStoryPost}
                    teamId={team._id}
                    productId={team.productId}
                    storyId={storyId}
                    page={page}
                    editable={isMemberOfTeam}
                    isScrollTarget={storyPostId === customStoryPost._id}
                    currentUser={currentUser}
                  />
                </TimeLineItem>
              );
            })}
            {isMemberOfTeam && currentUser && (
              <Box display="flex" alignItems="top" justifyContent="space-between" gap={1}>
                <UserIcon size={40} isLink attachmentId={currentUser.iconImageId} userId={currentUser._id} />
                <Box width="100%">
                  <CreateNewStoryPostPaper storyId={storyId} page={page} currentUser={currentUser} />
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={4} px={2} pb={3}>
            <Paper>
              <Box mb="12px">
                <FixedImage imageUrl={ogpUrl} />
              </Box>
              {isMemberOfTeam && (
                <Box textAlign="center" mb="12px">
                  <Reward ref={closeButtonRef} type="confetti" config={{ elementCount: 200, springAnimation: false }}>
                    <StyledButton color="primary" fullWidth outlined={story.isCompleted} onClick={handleClickIsCompletedButton}>
                      {story.isCompleted ? 'ストーリーをReopenする' : 'ストーリーをCloseする'}
                    </StyledButton>
                  </Reward>
                </Box>
              )}
              <IconButton icon="Twitter" width={30} color="primary" onClick={handleClickShareButton} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <UpdateStoryModal
        isOpen={isOpenUpdateStoryModal}
        onCloseModal={() => setIsOpenUpdateStoryModal(false)}
        story={story}
        teamId={team._id}
        page={page}
      />
      <DeleteStoryModal
        isOpen={isOpenDeleteStoryModal}
        onCloseModal={() => setIsOpenDeleteStoryModal(false)}
        page={page}
        teamId={team._id}
        productId={team.productId}
        story={story}
      />
    </>
  );
};

const StyledButton = styled(Button)`
  text-transform: none;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: any = async (context: any) => {
  const { storyId, productId } = context.params;

  const { data: pagination } = await restClient.apiGet<PaginationResult<Team>>(`/teams?productId=${productId}`);
  const team = pagination?.docs[0];

  const { data: story } = await restClient.apiGet(`/stories/${storyId}`);

  const { data: teamIconAttachment } = await restClient.apiGet(`/attachments/${team.iconImageId}`);

  if (!team || !story || !teamIconAttachment) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  return { props: { storyFromServerSide: story, team, teamIconAttachment }, revalidate: 60 };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

StoryPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
StoryPage.getAccessControl = () => {
  return { loginRequired: null };
};
export default StoryPage;
