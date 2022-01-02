import { ReactNode } from 'react';

import styled from 'styled-components';
import { useTeams } from '~/stores/team';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Link, Carousel } from '~/components/parts/commons';
import { URLS } from '~/constants';
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
      <ProecoOgpHead />
      <div className="container vh-100">
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="fw-bold text-center">プロダクトの開発記録を簡単に</h2>
            <p className="fs-2">あなたのプロセスの共有がプロダクトの魅力を高めます</p>
          </div>
        </div>
        <div className="col-12 col-md-6">hoge</div>
      </div>
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

Home.getLayout = (page: ReactNode) => <>{page}</>;

Home.getAccessControl = () => {
  return { loginRequired: null };
};

export default Home;
