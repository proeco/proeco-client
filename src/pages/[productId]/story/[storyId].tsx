import React, { ReactNode, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';

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

import { Emoji, Icon, Paper, TimeLineItem, Typography } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { CreateNewStoryPostPaper } from '~/components/domains/storyPost/CreateNewStoryPostPaper/CreateNewStoryPostPaper';
import { Dropdown } from '~/components/parts/commons/Dropdown';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { DisplayStoryPostPaper } from '~/components/domains/storyPost/DisplayStoryPostPaper';
import { Reaction, StoryPost, Team } from '~/domains';
import { UpdateStoryModal } from '~/components/domains/story/UpdateStoryModal';
import { DeleteStoryModal } from '~/components/domains/story/DeleteStoryModal';
import { Breadcrumbs } from '~/components/parts/commons/Breadcrumbs';
import { PaginationResult } from '~/interfaces';

type Props = {
  storyFromServerSide: Story;
  team: Team;
};

const StoryPage: ProecoNextPage<Props> = ({ storyFromServerSide, team }) => {
  const router = useRouter();

  const [isOpenUpdateStoryModal, setIsOpenUpdateStoryModal] = useState(false);
  const [isOpenDeleteStoryModal, setIsOpenDeleteStoryModal] = useState(false);
  const storyId = storyFromServerSide._id;
  const storyPostId = router.query.storyPostId as string;

  const { data: story } = useStory(storyId, storyFromServerSide);
  const { data: currentUser } = useCurrentUser();
  const { data: teamUsers = [] } = useTeamUsers({ teamId: team._id });

  const isMemberOfTeam = !!(currentUser && teamUsers.find((teamUser) => teamUser._id === currentUser._id));

  const { data: reactions } = useReactionsByUserId(currentUser?._id);

  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: storyPosts } = useStoryPosts({
    storyId,
    page,
    limit: 10,
  });

  const customStoryPosts: Array<StoryPost & { currentUserReaction?: Reaction }> = useMemo(() => {
    if (!storyPosts || !reactions) return [];
    return storyPosts?.map((s) => {
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

  if (!story || !storyPosts) {
    return null;
  }

  return (
    <>
      <ProecoOgpHead title={story.title} />
      <Box mx="auto" maxWidth="1200px">
        <Breadcrumbs breadcrumbsItems={[{ url: `${URLS.TEAMS(team.productId)}#story`, label: 'ストーリーリスト' }, { label: story.title }]} />
        <Box mt={1} mb={4} display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="16px">
            <Emoji emojiId={story.emojiId} size={40} />
            <Typography variant="h2" bold>
              {story.title}
            </Typography>
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
                    storyId={storyId}
                    page={page}
                    editable={isMemberOfTeam}
                    isScrollTarget={storyPostId === customStoryPost._id}
                  />
                </TimeLineItem>
              );
            })}
            {isMemberOfTeam && (
              <Box display="flex" alignItems="top" justifyContent="space-between" gap={1}>
                <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} />
                <Box width="100%">
                  <CreateNewStoryPostPaper storyId={storyId} page={page} />
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={4} px={2} pb={3}>
            <Paper>TODO</Paper>
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
        story={story}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { storyId, productId } = context.query;

  try {
    const { data: pagination } = await restClient.apiGet<PaginationResult<Team>>(`/teams?productId=${productId}`);
    const team = pagination?.docs[0];

    const { data: story } = await restClient.apiGet(`/stories/${storyId}`);

    if (!team || !story) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    return { props: { storyFromServerSide: story, team } };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
};

const getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
StoryPage.getLayout = getLayout;

export default StoryPage;
