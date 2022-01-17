import { GetStaticProps } from 'next';

import styled from 'styled-components';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Team } from '~/domains';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamPageLayout } from '~/components/parts/layout/TeamPageLayout';

import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { TeamSettingTab } from '~/components/domains/team/TeamSettingTab';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeamUsers } from '~/stores/team';
import { URLS } from '~/constants';
import { Spinner } from '~/components/parts/commons';

type Props = {
  team?: Team;
};

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const { data: currentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();
  const router = useRouter();

  const { data: teamUsers = [] } = useTeamUsers({ teamId: team?._id });
  const isMemberOfTeam = useMemo(() => {
    return !!currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id);
  }, [currentUser, teamUsers]);

  useEffect(() => {
    if (team && ((!currentUser && !isValidatingCurrentUser) || !isMemberOfTeam)) {
      router.push(URLS.TEAMS(team.productId));
    }
  }, [currentUser, team, router, isValidatingCurrentUser, isMemberOfTeam]);

  if (!team) {
    return (
      <div className="min-vh-100 text-center pt-5">
        <Spinner />
      </div>
    );
  }

  return (
    <TeamPageLayout team={team}>
      <StyledDiv className="mx-auto py-3">
        {currentUser && isMemberOfTeam && <TeamSettingTab currentUser={currentUser} team={team} />}
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
  return {
    paths: [],
    fallback: true,
  };
}

Dashboard.generateOgp = (props: Props) => {
  return <ProecoOgpHead title={`${props?.team?.name}のホーム`} />;
};

Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
