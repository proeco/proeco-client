import React, { useMemo, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';

import Reward, { RewardElement } from 'react-rewards';

import styled from 'styled-components';

import { restClient } from '~/utils/rest-client';
import { Story } from '~/domains/story';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { URLS } from '~/constants';

import { useStory } from '~/stores/story/useStory';
import { useStoryPosts } from '~/stores/storyPost';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useReactionsByUserId } from '~/stores/reaction';
import { useTeamUsers } from '~/stores/team';

import { Button, Card, Emoji, FixedImage, Icon, TimeLineItem } from '~/components/parts/commons';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamPageLayout } from '~/components/parts/layout/TeamPageLayout';
import { CreateNewStoryPostCard } from '~/components/domains/storyPost/CreateNewStoryPostCard/CreateNewStoryPostCard';
import { Dropdown, DropdownItem } from '~/components/parts/commons/Dropdown';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { DisplayStoryPostCard } from '~/components/domains/storyPost/DisplayStoryPostCard';
import { Attachment, Reaction, StoryPost, Team } from '~/domains';
import { UpdateStoryModal } from '~/components/domains/story/UpdateStoryModal';
import { DeleteStoryModal } from '~/components/domains/story/DeleteStoryModal';
import { PaginationResult } from '~/interfaces';

import { useErrorNotification } from '~/hooks/useErrorNotification';
import { createOgpUrl } from '~/utils/createOgpUrl';

type Props = {
  storyFromServerSide?: Story;
  team: Team;
  teamIconAttachment?: Attachment;
};

const StoryPage: ProecoNextPage<Props> = ({ storyFromServerSide, team, teamIconAttachment }) => {
  const router = useRouter();
  const closeButtonRef = useRef<RewardElement>(null);

  const { notifyErrorMessage } = useErrorNotification();

  const [isOpenUpdateStoryModal, setIsOpenUpdateStoryModal] = useState(false);
  const [isOpenDeleteStoryModal, setIsOpenDeleteStoryModal] = useState(false);
  const storyId = storyFromServerSide?._id;
  const storyPostId = router.query.storyPostId as string;

  const { data: story, mutate: mutateStory } = useStory(storyId, storyFromServerSide);
  const { data: currentUser } = useCurrentUser();
  const { data: teamUsers = [] } = useTeamUsers({ teamId: team?._id });

  const isMemberOfTeam = useMemo(() => {
    return !!currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id);
  }, [currentUser, teamUsers]);

  const { data: reactions = [] } = useReactionsByUserId(currentUser?._id);

  const page = router.query.page ? Number(router.query.page) : 1;

  const { data: storyPosts } = useStoryPosts({
    storyId,
    page,
    limit: 100,
  });

  const customStoryPosts: Array<StoryPost & { currentUserReaction?: Reaction }> = useMemo(() => {
    if (!storyPosts) return [];
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
      icon: <Icon icon="CLOCKWISE" size={16} />,
      text: '更新する',
      onClick: handleClickUpdate,
    },
    {
      icon: <Icon icon="TRASH" size={16} color="DANGER" />,
      text: '削除する',
      onClick: handleClickDelete,
    },
  ];

  const ogpUrl = useMemo(
    () => (story && team && teamIconAttachment ? createOgpUrl(story.title, team.name, teamIconAttachment.filePath) : ''),
    [story, team, teamIconAttachment],
  );

  const handleClickShareButton = useCallback(async () => {
    if (window != null) {
      const twitterUrl = new URL(
        `https://twitter.com/intent/tweet?url=${
          process.env.NEXT_PUBLIC_ROOT_URL + URLS.TEAMS_STORY(team?.productId || '', storyId || '')
        }&hashtags=Proeco`,
      );
      window.open(twitterUrl.toString(), '_blank');
    }
  }, [storyId, team?.productId]);

  if (!story || !storyPosts) {
    return null;
  }

  return (
    <TeamPageLayout team={team}>
      <StyledDiv className="mx-auto my-3">
        <div className="mb-3 d-flex align-items-center">
          <Emoji emojiId={story.emojiId} size={32} />
          <h2 className="ms-2 me-auto fw-bold mb-0 text-break">{story.title}</h2>
          {isMemberOfTeam && (
            <Dropdown toggle={<Icon icon="THREE_DOTS_VERTICAL" size={20} />}>
              {menuItems.map((menuItem, i) => (
                <DropdownItem key={i} onClick={menuItem.onClick}>
                  {menuItem.icon}
                  <span className="ms-2">{menuItem.text}</span>
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </div>
        <div className="row">
          <div className="col-12 col-md-8">
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
                  <DisplayStoryPostCard
                    createdUserId={createdStoryPostUser?._id}
                    createdUserAttachmentId={createdStoryPostUser?.iconImageId}
                    createdUserName={createdStoryPostUser?.name}
                    storyPost={customStoryPost}
                    teamId={team?._id || ''}
                    productId={team?.productId || ''}
                    storyId={storyId || ''}
                    page={page}
                    editable={isMemberOfTeam}
                    isScrollTarget={storyPostId === customStoryPost._id}
                    currentUser={currentUser}
                  />
                </TimeLineItem>
              );
            })}
            {isMemberOfTeam && currentUser && (
              <div className="mb-3 d-md-flex align-items-top justify-content-between">
                <div className="d-none d-md-block pe-2">
                  <UserIcon size={40} isLink attachmentId={currentUser.iconImageId} userId={currentUser._id} />
                </div>
                <div className="w-100">
                  <CreateNewStoryPostCard storyId={storyId || ''} page={page} currentUser={currentUser} />
                </div>
              </div>
            )}
          </div>
          <div className="col-12 col-md-4">
            <StyledRightSide className="position-sticky">
              <Card>
                <div className="mb-2 rounded-2 overflow-hidden">
                  <FixedImage imageUrl={ogpUrl} />
                </div>
                {isMemberOfTeam && (
                  <div className="text-center mb-3">
                    <Reward ref={closeButtonRef} type="confetti" config={{ elementCount: 200, springAnimation: false }}>
                      <Button color="primary" fullWidth outlined={story.isCompleted} onClick={handleClickIsCompletedButton}>
                        {story.isCompleted ? 'ストーリーをReopenする' : 'ストーリーをCloseする'}
                      </Button>
                    </Reward>
                  </div>
                )}
                <Button color="primary" onClick={handleClickShareButton}>
                  <Icon icon="TWITTER" size={16} color="WHITE" />
                </Button>
              </Card>
            </StyledRightSide>
          </div>
        </div>
      </StyledDiv>
      <UpdateStoryModal
        isOpen={isOpenUpdateStoryModal}
        onCloseModal={() => setIsOpenUpdateStoryModal(false)}
        story={story}
        teamId={team?._id || ''}
        page={page}
      />
      <DeleteStoryModal
        isOpen={isOpenDeleteStoryModal}
        onCloseModal={() => setIsOpenDeleteStoryModal(false)}
        page={page}
        teamId={team?._id || ''}
        productId={team?.productId || ''}
        story={story}
      />
    </TeamPageLayout>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

const StyledRightSide = styled.div`
  top: 86px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: any = async (context: any) => {
  const { storyId, productId } = context.params;

  try {
    const [{ data: pagination }, { data: story }] = await Promise.all([
      restClient.apiGet<PaginationResult<Team>>(`/teams?productId=${productId}`),
      restClient.apiGet(`/stories/${storyId}`),
    ]);

    const team = pagination?.docs[0];
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
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

StoryPage.generateOgp = ({ storyFromServerSide: story, team, teamIconAttachment }: Props) => {
  const ogpUrl = story && team && teamIconAttachment ? createOgpUrl(story.title, team.name, teamIconAttachment.filePath) : '';

  return (
    <ProecoOgpHead title={story?.title} image={ogpUrl} url={`${process.env.NEXT_PUBLIC_ROOT_URL}/${team?.productId}/story/${story?._id}`} />
  );
};

StoryPage.getAccessControl = () => {
  return { loginRequired: null };
};
export default StoryPage;
