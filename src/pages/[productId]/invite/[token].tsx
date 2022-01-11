import { GetServerSideProps } from 'next';
import { addDays, isPast } from 'date-fns';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { InvitationToken, Team, UserTeamRelation } from '~/domains';
import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { restClient } from '~/utils/rest-client';
import { Button } from '~/components/parts/commons';
import { useCurrentUser } from '~/stores/user/useCurrentUser';
import { URLS } from '~/constants';
import { useErrorNotification } from '~/hooks/useErrorNotification';
import { useSuccessNotification } from '~/hooks/useSuccessNotification';
import { useTeamUsers } from '~/stores/team';

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
      notifySuccessMessage('すでにチームに所属しています');
      router.push(URLS.TEAMS(team.productId));
    }
  }, [currentUser, notifySuccessMessage, router, team, teamUsers]);

  const handleApproveInvite = async () => {
    try {
      await restClient.apiPost<UserTeamRelation>('/user-team-relations', {
        token: router.query.token,
      });
      await mutateTeamUsers();
      notifySuccessMessage('チームに参加しました！');
      router.push(URLS.TEAMS(team.productId));
    } catch (error) {
      notifyErrorMessage('チームへの参加に失敗しました。');
    }
  };

  const handleRejectInvite = () => {
    router.push(URLS.TOP);
  };

  return (
    <DashboardLayout>
      <h1>{team.name}の参加確認画面</h1>
      <div className="mb-4">
        <Button color="primary" onClick={handleApproveInvite}>
          チームに参加する
        </Button>
      </div>
      <Button color="primary" onClick={handleRejectInvite}>
        Topページに戻る
      </Button>
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
