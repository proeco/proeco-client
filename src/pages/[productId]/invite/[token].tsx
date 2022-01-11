import { GetServerSideProps } from 'next';
import { addDays, isPast } from 'date-fns';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { Button, Link } from '~/components/parts/commons';
import { TeamCard } from '~/components/domains/team/TeamCard';
import { InvitationToken, Team, UserTeamRelation } from '~/domains';
import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { restClient } from '~/utils/rest-client';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { useTeamUsers } from '~/stores/team';
import { URLS } from '~/constants';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';

const TOKEN_LIMIT_DAYS = 7;

type Props = {
  team: Team;
};

const InvitePage: ProecoNextPage<Props> = ({ team }) => {
  const { data: currentUser, isValidating: isValidatingCurrentUser } = useCurrentUser();
  const { data: teamUsers = [], mutate: mutateTeamUsers } = useTeamUsers({ teamId: team._id });
  const router = useRouter();
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  useEffect(() => {
    if (!currentUser && !isValidatingCurrentUser) {
      notifySuccessMessage('ログイン後再度招待リンクを開いてください');
      router.push(URLS.TEAMS(team.productId));
    }
  }, [currentUser, team, router, notifySuccessMessage, isValidatingCurrentUser]);

  useEffect(() => {
    if (currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id)) {
      notifySuccessMessage('すでにプロダクトに所属しています');
      router.push(URLS.TEAMS(team.productId));
    }
  }, [currentUser, notifySuccessMessage, router, team, teamUsers]);

  const handleApproveInvite = async () => {
    try {
      await restClient.apiPost<UserTeamRelation>('/user-team-relations', {
        token: router.query.token,
      });
      await mutateTeamUsers();
      notifySuccessMessage('プロダクトに参加しました！');
      router.push(URLS.TEAMS(team.productId));
    } catch (error) {
      notifyErrorMessage('プロダクトへの参加に失敗しました。');
    }
  };

  return (
    <DashboardLayout>
      <ProecoOgpHead />
      <div className="d-flex flex-column align-items-center justify-content-center pt-3">
        <h1 className="fw-normal mb-4">
          <span className="fw-bold">{team.name}</span>があなたをプロダクトに招待しました！
        </h1>
        <div className="mb-4">
          <TeamCard name={team.name} description={team.description} attachmentId={team.iconImageId} url={team.url} />
        </div>
        <div className="d-flex align-items-center gap-3">
          <Button color="primary" onClick={handleApproveInvite}>
            プロダクトに参加する
          </Button>
          <Link href={URLS.TOP}>Topページに戻る</Link>
        </div>
      </div>
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
