import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { User } from '~/domains';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { restClient } from '~/utils/rest-client';

type Props = {
  user: User;
};

const Dashboard: ProecoNextPage<Props> = ({ user }) => {
  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box>
          <UserIcon attachmentId={user.iconImageId} size={60} userId={user._id} />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;

  try {
    const { data: user } = await restClient.apiGet<User>(`/users/${userId}`);

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    return { props: { user } };
  } catch (error) {
    return { props: {} };
  }
};

Dashboard.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
