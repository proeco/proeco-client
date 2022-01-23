import styled from 'styled-components';
import { GetStaticProps } from 'next';

import { Link, Carousel } from '~/components/parts/commons';
import { IMAGE_PATH, URLS } from '~/constants';
import { TeamCard } from '~/components/domains/team/TeamCard';

import { StoryCard } from '~/components/domains/story/StoryCard';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { PaginationResult } from '~/interfaces';
import { restClient } from '~/utils/rest-client';
import { convertStoryFromServer, convertTeamFromServer, Story, Team } from '~/domains';

type Props = {
  teams: Team[];
  stories: Story[];
};

const Home: ProecoNextPage<Props> = ({ teams, stories }) => {
  return (
    <>
      <img className="d-none d-md-block" src={IMAGE_PATH.EYE_CATCH} alt={IMAGE_PATH.EYE_CATCH} width="100%" />
      <img className="d-md-none d-block" src={IMAGE_PATH.EYE_CATCH_MOBILE} alt={IMAGE_PATH.EYE_CATCH} width="100%" />
      <h1 className="text-center fw-bold my-3">プロダクト一覧</h1>
      <StyledDiv className="mb-5 mx-auto">
        <Carousel autoPlay>
          {teams.map((_team, index) => {
            const team = convertTeamFromServer(_team);
            return (
              <div className="px-3" key={index}>
                <Link href={URLS.TEAMS(team.productId)}>
                  <TeamCard name={team.name} description={team.description} attachmentId={team.iconImageId} url={team.url} />
                </Link>
              </div>
            );
          })}
        </Carousel>
      </StyledDiv>
      <h2 className="text-center fw-bold my-3">進行中のストーリー一覧</h2>
      <StyledDiv className="mb-5 mx-auto">
        <Carousel autoPlay>
          {stories.map((_story, index) => {
            const story = convertStoryFromServer(_story);
            return (
              <div className="px-3" key={index}>
                <StoryCard story={story} />
              </div>
            );
          })}
        </Carousel>
      </StyledDiv>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: teamPagination } = await restClient.apiGet<PaginationResult<Team>>('/teams?page=1&limit=10');
    const { data: storyPagination } = await restClient.apiGet<PaginationResult<Story>>('/stories?page=1&limit=10&isCompleted=false');

    return { props: { teams: teamPagination.docs, stories: storyPagination.docs }, revalidate: 60 };
  } catch (error) {
    return {
      props: {
        teams: [],
        stories: [],
      },
    };
  }
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

Home.getAccessControl = () => {
  return { loginRequired: null };
};

export default Home;
