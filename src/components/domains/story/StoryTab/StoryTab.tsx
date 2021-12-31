import React, { VFC, useState } from 'react';

import { Button, Carousel, Icon, Pagination } from '~/components/parts/commons';
import { StoryListTable } from '~/components/domains/story/StoryListTable';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';
import { StoryCard, SkeltonStoryCard } from '~/components/domains/story/StoryCard';
import { Team } from '~/domains';
import { useStories } from '~/stores/story';

type Props = {
  team: Team;
  editable: boolean;
};

export const StoryTab: VFC<Props> = ({ team, editable }) => {
  const [isOpenCreateNewStoryModal, setIsOpeCreateNewStoryModal] = useState(false);

  const [closeStoryPage, setCloseStoryPage] = useState(1);

  const { data: openStoryList } = useStories({ page: 1, limit: 100, teamId: team._id, isCompleted: false });
  const { data: closeStoriesPagination } = useStories({
    page: closeStoryPage,
    limit: 10,
    teamId: team._id,
    isCompleted: true,
  });

  const handleClickCreateStoryButton = () => {
    setIsOpeCreateNewStoryModal(true);
  };

  const handleChangePage = (value: number | null) => {
    if (!value) return;
    setCloseStoryPage(value);
  };

  return (
    <>
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h3 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <Icon icon="LIST" size={24} />
          進行中のストーリー
        </h3>
        {editable && (
          <Button onClick={handleClickCreateStoryButton} color="primary">
            <Icon icon="PENCIL" size={16} color="WHITE" />
            追加する
          </Button>
        )}
      </div>
      <Carousel>
        {openStoryList
          ? openStoryList.docs.map((story, index) => {
              return (
                <div className="px-3" key={index}>
                  <StoryCard story={story} />
                </div>
              );
            })
          : [
              <div className="px-3" key="first">
                <SkeltonStoryCard />
              </div>,
              <div className="px-3" key="second">
                <SkeltonStoryCard />
              </div>,
            ]}
      </Carousel>
      <h3 className="fw-bold my-4 text-center">完了したストーリー</h3>
      {closeStoriesPagination && closeStoriesPagination.docs.length !== 0 && (
        <>
          <StoryListTable stories={closeStoriesPagination.docs} productId={team.productId} />
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <Pagination count={closeStoriesPagination.totalPages} page={closeStoryPage} onChange={handleChangePage} />
          </div>
        </>
      )}
      <CreateNewStoryModal
        isOpen={isOpenCreateNewStoryModal}
        onCloseModal={() => setIsOpeCreateNewStoryModal(false)}
        teamId={team._id}
        page={1}
      />
    </>
  );
};
