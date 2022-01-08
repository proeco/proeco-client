import styled from 'styled-components';

import { Button, Icon, Link } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

import { URLS } from '~/constants';

import { useTeamsRelatedUser } from '~/stores/team';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { SkeltonTeamCard } from '~/components/domains/team/TeamCard/TeamCard';

const DashboardTeamPage: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: teams } = useTeamsRelatedUser({
    userId: currentUser?._id,
  });

  return (
    <DashboardLayout>
      <ProecoOgpHead />
      <StyledDiv className="mx-auto">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <Icon icon="PEOPLE" size={28} />
            プロダクトリスト
          </h2>
          <Link href={URLS.DASHBOARD_TEAMS_NEW}>
            <Button color="primary">
              <Icon icon="PENCIL" size={16} color="WHITE" />
              作成する
            </Button>
          </Link>
        </div>
        <div className="row gy-3">
          {teams ? (
            teams.map((team) => (
              <div key={`my-teams-${team._id}`} className="col-12 col-sm-6 col-md-4">
                <Link href={URLS.TEAMS(team.productId)}>
                  <TeamCard name={team.name} description={team.description} attachmentId={team.iconImageId} url={team.url} />
                </Link>
              </div>
            ))
          ) : (
            <>
              <div className="col-12 col-sm-6 col-md-4">
                <SkeltonTeamCard />
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                <SkeltonTeamCard />
              </div>
            </>
          )}
        </div>
      </StyledDiv>
    </DashboardLayout>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

DashboardTeamPage.getAccessControl = () => {
  return { destination: URLS.TOP, loginRequired: true };
};
export default DashboardTeamPage;
