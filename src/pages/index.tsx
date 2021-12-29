import { ReactNode } from 'react';
import { Box } from '@mui/system';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import styled from 'styled-components';
import { useTeams } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Link } from '~/components/parts/commons';
import { URLS } from '~/constants';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { TeamCard } from '~/components/domains/team/TeamCard';

import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';
import { useStories } from '~/stores/story';
import { SkeltonStoryCard, StoryCard } from '~/components/domains/story/StoryCard';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

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

const Home: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: teamList } = useTeams({ page: 1 });
  const { data: openStoryList } = useStories({ page: 1, limit: 100, isCompleted: false });

  return (
    <>
      <ProecoOgpHead />
      <h1 className="text-center fw-bold my-3">プロダクト一覧</h1>
      <Box mb={5} maxWidth="1200px" mx="auto">
        <StyledCarousel responsive={responsive} showDots arrows={false} autoPlay>
          {teamList
            ? teamList.docs.map((team, index) => {
                return (
                  <Box px={2} key={index}>
                    <Link href={URLS.TEAMS(team.productId)}>
                      <TeamCard
                        name={team.name}
                        productId={team.productId}
                        description={team.description}
                        attachmentId={team.iconImageId}
                        url={team.url}
                      />
                    </Link>
                  </Box>
                );
              })
            : [
                <Box px={2} key="first">
                  <SkeltonTeamCard />
                </Box>,
                <Box px={2} key="second">
                  <SkeltonTeamCard />
                </Box>,
              ]}
        </StyledCarousel>
      </Box>
      <h2 className="text-center fw-bold my-3">進行中のストーリー一覧</h2>
      <Box mb={5} maxWidth="1200px" mx="auto">
        <StyledCarousel responsive={responsive} showDots arrows={false} autoPlay>
          {openStoryList
            ? openStoryList.docs.map((story, index) => {
                return (
                  <Box px={2} key={index}>
                    <StoryCard story={story} />
                  </Box>
                );
              })
            : [
                <Box px={2} key="first">
                  <SkeltonStoryCard />
                </Box>,
                <Box px={2} key="second">
                  <SkeltonStoryCard />
                </Box>,
              ]}
        </StyledCarousel>
      </Box>
      <h1 className="text-center fw-bold">Top Page</h1>
      <Link href={URLS.DASHBOARD_TEAMS}>所属チーム一覧</Link>
      {currentUser ? (
        <>
          <h3>Hello {currentUser.name}!</h3>
          <UserIcon size={200} userId={currentUser._id} attachmentId={currentUser.iconImageId} />
          <Link href={URLS.API_LOGOUT}>Logout</Link>
        </>
      ) : (
        <Link href={URLS.API_LOGIN}>Login</Link>
      )}
    </>
  );
};

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
      /* あとで直す */
      background-color: #6684f7;
      transform: scale(1.6);
    }
  }
`;

Home.getLayout = (page: ReactNode) => <>{page}</>;

Home.getAccessControl = () => {
  return { loginRequired: null };
};

export default Home;
