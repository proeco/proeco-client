import { ReactNode } from 'react';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Dashboard: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      Dashboard
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Dashboard.getLayout = getLayout;
export default Dashboard;
