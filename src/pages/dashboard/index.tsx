import { NextPage } from 'next';
import { LoginRequiredWrapper } from '~/components/parts/authentication/LoginRequiredWrapper';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';

const Dashboard: NextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <LoginRequiredWrapper>Dashboard</LoginRequiredWrapper>
    </>
  );
};

export default Dashboard;
