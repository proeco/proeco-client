import { ReactNode } from 'react';
import { LoginRequiredWrapper } from '~/components/parts/authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const Dashboard: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <LoginRequiredWrapper>Dashboard</LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Dashboard.getLayout = getLayout;
export default Dashboard;
