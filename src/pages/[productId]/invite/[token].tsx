import { ReactNode } from 'react';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

const InvitePage: ProecoNextPage = () => {
  return (
    <>
      <ProecoOgpHead />
      <h1>参加確認画面</h1>
    </>
  );
};

InvitePage.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
InvitePage.getAccessControl = () => {
  return { loginRequired: null };
};

export default InvitePage;
