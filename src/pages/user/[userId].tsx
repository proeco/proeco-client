import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { Typography } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { User } from '~/domains';
import { restClient } from '~/utils/rest-client';

type Props = {
  user: User;
};

const Dashboard: ProecoNextPage<Props> = ({ user }) => {
  return (
    <>
      <ProecoOgpHead />
      <Box mx="auto" maxWidth="1200px">
        <Box display="flex" alignItems="flex-start" gap="16px">
          <UserIcon attachmentId={user.iconImageId} size={120} userId={user._id} />
          <Box pt="8px">
            <Typography variant="h3" marginBottom="16px" bold>
              {user.name}
            </Typography>
            <Typography>{user.description}</Typography>
          </Box>
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
