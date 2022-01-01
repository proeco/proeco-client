import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect, useMemo } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import styled from 'styled-components';
import { Team } from '~/domains';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { StoryTab } from '~/components/domains/story/StoryTab';
import { TeamHomeTab } from '~/components/domains/team/TeamHomeTab';

import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeamUsers } from '~/stores/team';

import { restClient } from '~/utils/rest-client';
import { extractHash } from '~/utils/extractHash';

import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamSettingTab } from '~/components/domains/team/TeamSettingTab';

const TabTypes = { HOME: 'home', STORY: 'story', SETTINGS: 'settings' };
type TabTypes = typeof TabTypes[keyof typeof TabTypes];

type Props = {
  team: Team;
};

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.HOME);
  const { data: teamUsers = [] } = useTeamUsers({ teamId: team._id });

  const isMemberOfTeam = useMemo(() => {
    return !!currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id);
  }, [currentUser, teamUsers]);

  useEffect(() => {
    switch (extractHash(router.asPath)) {
      case TabTypes.HOME: {
        setActiveTab(TabTypes.HOME);
        break;
      }
      case TabTypes.STORY: {
        setActiveTab(TabTypes.STORY);
        break;
      }
      case TabTypes.SETTINGS: {
        if (isMemberOfTeam) {
          setActiveTab(TabTypes.SETTINGS);
        }
        break;
      }
      default: {
        void 0;
      }
    }
  }, [isMemberOfTeam, router.asPath]);

  const handleChange = (newValue: TabTypes) => {
    router.push(`#${newValue}`);
    setActiveTab(newValue);
  };

  return (
    <>
      <ProecoOgpHead title={`${team.name}のホーム`} />
      <StyledDiv className="mx-auto">
        <div className="mb-2 d-flex align-items-center">
          <TeamIcon attachmentId={team.iconImageId} size={80} />
          <div className="d-flex flex-column ms-3">
            <h1 className="mb-0 maximum_lines_1">{team.name}</h1>
            <a className="text-decoration-none" href={team.url}>
              {team.url}
            </a>
          </div>
        </div>
        <Nav tabs>
          <NavItem active={activeTab === TabTypes.HOME}>
            <NavLink
              className={`${
                activeTab === TabTypes.HOME ? 'active border-bottom border-4 text-primary' : 'text-black'
              } c-pointer bg-transparent border-0 border-primary`}
              onClick={() => handleChange(TabTypes.HOME)}
            >
              <span className="fw-bold fs-1">ホーム</span>
            </NavLink>
          </NavItem>
          <NavItem active={activeTab === TabTypes.STORY}>
            <NavLink
              className={`${
                activeTab === TabTypes.STORY ? 'active border-bottom border-4 text-primary' : 'text-black'
              } c-pointer bg-transparent border-0 border-primary`}
              onClick={() => handleChange(TabTypes.STORY)}
            >
              <span className="fw-bold fs-1">ストーリー</span>
            </NavLink>
          </NavItem>
          {isMemberOfTeam && (
            <NavItem active={activeTab === TabTypes.SETTINGS}>
              <NavLink
                className={`${
                  activeTab === TabTypes.SETTINGS ? 'active border-bottom border-4 text-primary' : 'text-black'
                } c-pointer bg-transparent border-0 border-primary`}
                onClick={() => handleChange(TabTypes.SETTINGS)}
              >
                <span className="fw-bold fs-1">設定</span>
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane className="py-3" tabId={TabTypes.HOME}>
            <TeamHomeTab team={team} currentUser={currentUser} editable={isMemberOfTeam} />
          </TabPane>
          <TabPane className="py-3" tabId={TabTypes.STORY}>
            <StoryTab team={team} editable={isMemberOfTeam} />
          </TabPane>
          <TabPane className="py-3" tabId={TabTypes.SETTINGS}>
            {isMemberOfTeam && currentUser && <TeamSettingTab currentUser={currentUser} team={team} />}
          </TabPane>
        </TabContent>
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.query;

  try {
    const { data: pagination } = await restClient.apiGet<PaginationResult<Team>>(`/teams?productId=${productId}`);
    const team = pagination?.docs[0];

    if (!team) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    return { props: { team } };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
};

Dashboard.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
