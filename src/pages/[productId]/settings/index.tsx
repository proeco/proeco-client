import { GetStaticProps } from 'next';

import styled from 'styled-components';
import { Team } from '~/domains';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamPageLayout } from '~/components/parts/layout/TeamPageLayout';

import { useCurrentUser } from '~/stores/user/useCurrentUser';

import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamSettingTab } from '~/components/domains/team/TeamSettingTab';

type Props = {
  team?: Team;
};

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const { data: currentUser } = useCurrentUser();

  if (!team) {
    return null;
  }

  return (
    <TeamPageLayout team={team}>
      <StyledDiv className="mx-auto py-3">
        {currentUser && team.adminUserId === currentUser._id && <TeamSettingTab currentUser={currentUser} team={team} />}
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

export async function getStaticPaths() {
  try {
    const { data: pagination } = await restClient.apiGet<PaginationResult<Team>>(`/teams?page=1&limit=10`);

    const paths = pagination.docs.map((v) => {
      return {
        params: {
          productId: v.productId,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
}

Dashboard.generateOgp = (props: Props) => {
  return <ProecoOgpHead title={`${props?.team?.name}のホーム`} />;
};

Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
