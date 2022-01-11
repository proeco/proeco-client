import { GetServerSideProps } from 'next';
import { useMemo } from 'react';

import styled from 'styled-components';
import { Team } from '~/domains';

import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { TeamPageLayout } from '~/components/parts/layout/TeamPageLayout';

import { StoryTab } from '~/components/domains/story/StoryTab';

import { useCurrentUser } from '~/hooks/CurrentUserProvider';
import { useTeamUsers } from '~/stores/team';

import { restClient } from '~/utils/rest-client';

import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';

type Props = {
  team: Team;
};

const Dashboard: ProecoNextPage<Props> = ({ team }) => {
  const { currentUser } = useCurrentUser();
  const { data: teamUsers = [] } = useTeamUsers({ teamId: team._id });

  const isMemberOfTeam = useMemo(() => {
    return !!currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id);
  }, [currentUser, teamUsers]);

  return (
    <TeamPageLayout team={team} isMemberOfTeam={isMemberOfTeam}>
      <StyledDiv className="mx-auto py-3">
        <StoryTab team={team} editable={isMemberOfTeam} />
      </StyledDiv>
    </TeamPageLayout>
  );
};

const StyledDiv = styled.div`
  max-width: 1200px;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.query;

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

Dashboard.generateOgp = ({ team }: Props) => {
  return <ProecoOgpHead title={`${team.name}のホーム`} />;
};

Dashboard.getAccessControl = () => {
  return { loginRequired: null };
};
export default Dashboard;
