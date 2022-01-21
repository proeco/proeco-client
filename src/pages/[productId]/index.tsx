import { GetStaticProps } from 'next';

import styled from 'styled-components';
import { Team } from '~/domains';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamPageLayout } from '~/components/parts/layout/TeamPageLayout';

import { TeamHomeTab } from '~/components/domains/team/TeamHomeTab';

import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

type Props = {
  team: Team;
};

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const { data: currentUser } = useCurrentUser();

  return (
    <TeamPageLayout team={team}>
      <StyledDiv className="mx-auto py-3">
        <TeamHomeTab team={team} currentUser={currentUser} editable={team.adminUserId === currentUser?._id} />
      </StyledDiv>
    </TeamPageLayout>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async (context: any) => {
  const { productId } = context.params;

  try {
    const { data: pagination } = await restClient.apiGet<PaginationResult<Team>>(`/teams?productId=${productId}`);
    const team = pagination?.docs[0];

    if (!team) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    return { props: { team }, revalidate: 30 };
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

Dashboard.generateOgp = (props: Props) => {
  if (!props.team) return <></>;

  return <ProecoOgpHead title={`${props.team.name}のホーム`} description={props.team.description} />;
};
Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
