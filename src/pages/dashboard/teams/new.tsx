import { ReactNode } from 'react';

import styled from 'styled-components';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { URLS } from '~/constants';

import { Icon } from '~/components/parts/commons';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamForm } from '~/components/domains/team/TeamForm';

const DashboardTeamPage: ProecoNextPage = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <ProecoOgpHead />
      <StyledDiv className="mx-auto">
        <h2 className="fw-bold mb-3 d-flex align-items-center gap-2">
          <Icon icon="PENCIL" size={28} />
          作成する
        </h2>
        {currentUser && <TeamForm currentUser={currentUser} />}
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

DashboardTeamPage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
DashboardTeamPage.getAccessControl = () => {
  return { destination: URLS.TOP, loginRequired: true };
};
export default DashboardTeamPage;
