import React, { VFC, useState, ChangeEvent } from 'react';
import { Box, styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import { Button, Icon, Typography, Pagination } from '~/components/parts/commons';
import { StoryListTable } from '~/components/domains/story/StoryListTable';
import { CreateNewStoryModal } from '~/components/domains/story/CreateNewStoryModal';
import { StoryCard, SkeltonStoryCard } from '~/components/domains/story/StoryCard';
import { Team } from '~/domains';
import { useStories } from '~/stores/story';

import 'react-multi-carousel/lib/styles.css';

type Props = {
  team: Team;
  editable: boolean;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 960 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 960, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
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

  const handleChangePage = (event: ChangeEvent<unknown>, value: number | null) => {
    event.preventDefault();
    if (!value) return;
    setCloseStoryPage(value);
  };

  return (
    <>
      <Box mb={6} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" bold display="flex" alignItems="center" gap="8px">
          <Icon icon="HistoryEdu" width={32} />
          ストーリーリスト
        </Typography>
        {editable && (
          <Button onClick={handleClickCreateStoryButton} color="primary">
            <Icon icon="CreateOutlined" width="20px" />
            ストーリーを追加する
          </Button>
        )}
      </Box>
      {openStoryList && openStoryList.docs.length !== 0 && (
        <Typography variant="h4" bold align="center" mb={3}>
          進行中のストーリー
        </Typography>
      )}
      <Box mb={5}>
        <StyledCarousel responsive={responsive} showDots arrows={false}>
          {openStoryList ? (
            openStoryList.docs.map((story) => {
              return (
                <Box px={2} key={`top-${story._id}`}>
                  <StoryCard story={story} isLink />
                </Box>
              );
            })
          ) : (
            <>
              <SkeltonStoryCard />
              <SkeltonStoryCard />
            </>
          )}
        </StyledCarousel>
      </Box>
      {closeStoriesPagination && closeStoriesPagination.docs.length !== 0 && (
        <>
          <Typography variant="h4" bold align="center" mb={3}>
            完了したストーリー
          </Typography>
          <StoryListTable stories={closeStoriesPagination.docs} productId={team.productId} />
          <StyledPagination count={closeStoriesPagination.totalPages} page={closeStoryPage} onChange={handleChangePage} />
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

const StyledPagination = styled(Pagination)`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCarousel = styled(Carousel)`
  &.react-multi-carousel-list {
    padding-bottom: 48px;
  }
  .react-multi-carousel-dot-list {
    gap: 4px;
  }
  .react-multi-carousel-dot {
    > button {
      border: none;
      background-color: #ced7fd;
    }
  }
  .react-multi-carousel-dot--active {
    > button {
      background-color: ${(props) => props.theme.palette.primary.main};
      transform: scale(1.6);
    }
  }
`;
