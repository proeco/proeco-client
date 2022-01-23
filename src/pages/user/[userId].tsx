import { GetStaticProps } from 'next';
import { useMemo } from 'react';
import styled from 'styled-components';

import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { Icon, Link } from '~/components/parts/commons';
import { UserIcon } from '~/components/domains/user/UserIcon';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { User } from '~/domains';
import { restClient } from '~/utils/rest-client';
import { useTeamsRelatedUser } from '~/stores/team';
import { SkeltonTeamCard, TeamCard } from '~/components/domains/team/TeamCard/TeamCard';
import { URLS } from '~/constants';

type Props = {
  user: User;
};

const Dashboard: ProecoNextPage<Props> = ({ user }) => {
  const { data: teamsRelatedUser } = useTeamsRelatedUser({ userId: user._id });

  const teamsContent = useMemo(() => {
    if (!teamsRelatedUser) {
      return (
        <>
          <div className="col-12 col-sm-6">
            <SkeltonTeamCard />
          </div>
          <div className="col-12 col-sm-6">
            <SkeltonTeamCard />
          </div>
        </>
      );
    }

    if (teamsRelatedUser.length === 0)
      return (
        <div className="col-12 col-sm-6 text-center pt-3">
          <h3>所属しているプロダクトがありません</h3>
        </div>
      );

    return teamsRelatedUser.map((team) => (
      <div key={`top-${team._id}`} className="col-12 col-sm-6">
        <Link href={URLS.TEAMS(team.productId)}>
          <TeamCard name={team.name} description={team.description} attachmentId={team.iconImageId} url={team.url} />
        </Link>
      </div>
    ));
  }, [teamsRelatedUser]);

  return (
    <DashboardLayout>
      <StyledDiv className="mx-auto">
        <div className="d-flex align-items-start gap-4 mb-5">
          <UserIcon attachmentId={user.iconImageId} size={120} userId={user._id} />
          <div className="mt-2">
            <h3 className="mb-3 fw-bold">{user.name}</h3>
            <p className="mb-0">{user.description}</p>
          </div>
        </div>
        <h2 className="fw-bold mb-4 d-flex align-items-center gap-2">
          <Icon icon="PEOPLE" size={32} />
          プロダクトリスト
        </h2>
        <StyledRow className="row mx-auto gy-3">{teamsContent}</StyledRow>
      </StyledDiv>
    </DashboardLayout>
  );
};

const StyledRow = styled.div`
  max-width: 900px;
`;

const StyledDiv = styled.div`
  max-width: 1200px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async (context: any) => {
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

    return { props: { user }, revalidate: 60 };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
