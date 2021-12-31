import { ReactNode } from 'react';
import styled from 'styled-components';

import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { URLS } from '~/constants';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Dashboard: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <StyledDiv className="mx-auto">
        <div className="d-flex align-items-center">
          {/* <h3 variant="h3" bold display="flex" alignItems="center" gap="8px">
            <Icon icon="DashboardOutlined" width={32} />
            ホーム
          </h3> */}
        </div>
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

Dashboard.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
Dashboard.getAccessControl = () => {
  return { destination: URLS.TOP, loginRequired: true };
};
export default Dashboard;
