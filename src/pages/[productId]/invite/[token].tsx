import { GetServerSideProps } from 'next';
import { addDays, isPast } from 'date-fns';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { InvitationToken, Team } from '~/domains';
import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { restClient } from '~/utils/rest-client';

const TOKEN_LIMIT_DAYS = 7;

type Props = {
  team: Team;
};

const InvitePage: ProecoNextPage<Props> = ({ team }) => {
  return (
    <DashboardLayout>
      <ProecoOgpHead />
      <h1>{team.name}の参加確認画面</h1>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId, token } = context.query;

  try {
    const { data: invitationToken } = await restClient.apiGet<InvitationToken>(`/invitation-tokens/${token}`);
    const { data: pagination } = await restClient.apiGet<PaginationResult<Team>>(`/teams?productId=${productId}`);
    const team = pagination?.docs[0];

    if (!invitationToken || invitationToken.teamId !== team._id || isPast(addDays(new Date(invitationToken.createdAt), TOKEN_LIMIT_DAYS))) {
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

InvitePage.getAccessControl = () => {
  return { loginRequired: null };
};

export default InvitePage;
