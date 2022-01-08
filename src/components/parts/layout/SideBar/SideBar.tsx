import { ComponentProps, memo, VFC } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Icon, Link } from '~/components/parts/commons';

import { UserIcon } from '~/components/domains/user/UserIcon';
import { User } from '~/domains';
import { URLS } from '~/constants';

type Props = {
  currentUser: User;
};

const sidebarItems: {
  icon: ComponentProps<typeof Icon>['icon'];
  url: string;
  text: string;
}[] = [
  // {
  //   icon: 'DashboardOutlined',
  //   url: URLS.DASHBOARD,
  //   text: 'ホーム',
  // },
  {
    icon: 'PEOPLE',
    url: URLS.DASHBOARD_TEAMS,
    text: 'プロダクト',
  },
  {
    icon: 'GEAR',
    url: URLS.DASHBOARD_SETTINGS,
    text: '設定',
  },
];

export const SideBar: VFC<Props> = memo(({ currentUser }) => {
  const router = useRouter();

  return (
    <div className="bg-white p-3 d-flex flex-column align-items-center d-md-block d-none">
      <StyledDiv className="sticky-top">
        <UserIcon size={40} attachmentId={currentUser.iconImageId} userId={currentUser._id} isLink />
        <div className="mt-4 d-flex flex-column gap-3">
          {sidebarItems.map((sidebarItem, index) => {
            return (
              <Link href={sidebarItem.url} key={index}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <Icon icon={sidebarItem.icon} size={24} color={sidebarItem.url === router.asPath ? 'PRIMARY' : 'BLACK'} />
                  <span className={`fs-4 fw-bold ${sidebarItem.url === router.asPath ? 'text-primary' : 'text-black'}`}>
                    {sidebarItem.text}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </StyledDiv>
    </div>
  );
});

const StyledDiv = styled.div`
  top: 72px;
`;
