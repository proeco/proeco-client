import styled from 'styled-components';
import { useTeams } from '~/stores/team';

import { Link, Carousel } from '~/components/parts/commons';
import { IMAGE_PATH, URLS } from '~/constants';
import { TeamCard } from '~/components/domains/team/TeamCard';

import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';
import { useStories } from '~/stores/story';
import { SkeltonStoryCard, StoryCard } from '~/components/domains/story/StoryCard';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Home: ProecoNextPage = () => {
  const { data: teamList } = useTeams({ page: 1 });
  const { data: openStoryList } = useStories({ page: 1, limit: 100, isCompleted: false });

  return (
    <>
      <img className="d-none d-md-block" src={IMAGE_PATH.EYE_CATCH} alt={IMAGE_PATH.EYE_CATCH} width="100%" />
      <img className="d-md-none d-block" src={IMAGE_PATH.EYE_CATCH_MOBILE} alt={IMAGE_PATH.EYE_CATCH} width="100%" />
      <h1 className="text-center fw-bold my-3">プロダクト一覧</h1>
      <StyledDiv className="mb-5 mx-auto">
        <Carousel autoPlay>
          {teamList
            ? teamList.docs.map((team, index) => {
                return (
                  <div className="px-3" key={index}>
                    <Link href={URLS.TEAMS(team.productId)}>
                      <TeamCard name={team.name} description={team.description} attachmentId={team.iconImageId} url={team.url} />
                    </Link>
                  </div>
                );
              })
            : [
                <div className="px-3" key="first">
                  <SkeltonTeamCard />
                </div>,
                <div className="px-3" key="second">
                  <SkeltonTeamCard />
                </div>,
              ]}
        </Carousel>
      </StyledDiv>
      <h2 className="text-center fw-bold my-3">進行中のストーリー一覧</h2>
      <StyledDiv className="mb-5 mx-auto">
        <Carousel autoPlay>
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
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

Home.getAccessControl = () => {
  return { loginRequired: null };
};

export default Home;
