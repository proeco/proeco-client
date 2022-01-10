import { GetServerSideProps } from 'next';
import { addDays, isPast } from 'date-fns';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '~/components/parts/layout/DashboardLayout';
import { ProecoOgpHead } from '~/components/parts/layout/ProecoOgpHead';
import { InvitationToken, Team } from '~/domains';
import { PaginationResult } from '~/interfaces';
import { ProecoNextPage } from '~/interfaces/proecoNextPage';
import { restClient } from '~/utils/rest-client';
import { Button } from '~/components/parts/commons';
import { LoginModal } from '~/components/parts/authentication/LoginModal';
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { data: teamUsers = [] } = useTeamUsers({ teamId: team._id });
  const router = useRouter();
  const { notifySuccessMessage } = useSuccessNotification();
  const { notifyErrorMessage } = useErrorNotification();

  useEffect(() => {
    currentUser ? setIsLoginModalOpen(false) : setIsLoginModalOpen(true);

    if (currentUser && teamUsers.some((teamUser) => teamUser._id === currentUser._id)) {
      notifySuccessMessage('すでにチームに所属しています');
      router.push(URLS.TEAMS(team.productId));
    }
  }, [currentUser, teamUsers, team, router, notifySuccessMessage]);

  const handleApproveInvite = async () => {
    try {
      await restClient.apiPost<InvitationToken>('/user-team-relations', {
        token: router.query.token,
      });
      notifySuccessMessage('チームに参加しました！');
    } catch (error) {
      notifyErrorMessage('チームへの参加に失敗しました。');
    }

    router.push(URLS.TEAMS(team.productId));
  };

  const handleRejectInvite = () => {
    router.push(URLS.TOP);
  };

  return (
    <DashboardLayout>
      <ProecoOgpHead />
      <h1>{team.name}の参加確認画面</h1>
      <div className="mb-4">
        <Button color="primary" onClick={handleApproveInvite}>
          チームに参加する
        </Button>
      </div>
      <Button color="primary" onClick={handleRejectInvite}>
        Topページに戻る
      </Button>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
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
