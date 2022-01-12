import styled from 'styled-components';
import { FC } from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';
import { useRouter } from 'next/router';
import { FooterNavbar } from '../FooterNavbar';
import { Link } from '../../commons';
import { URLS } from '~/constants';
import { Team } from '~/domains';
import { TeamIcon } from '~/components/domains/team/TeamIcon';
import { useCurrentUser } from '~/hooks/CurrentUserProvider';

const navItems = [
  {
    path: (productId: string) => URLS.TEAMS(productId),
    text: 'ホーム',
    isActive: (path: string) => path === '/[productId]',
    onlyAdmin: false,
  },
  {
    path: (productId: string) => URLS.TEAMS_STORIES(productId),
    text: 'ストーリー',
    isActive: (path: string) => path.startsWith('/[productId]/story'),
    onlyAdmin: false,
  },
  {
    path: (productId: string) => URLS.TEAMS_SETTINGS(productId),
    text: '設定',
    isActive: (path: string) => path.startsWith('/[productId]/settings'),
    onlyAdmin: true,
  },
];

type Props = {
  team: Team;
};

export const TeamPageLayout: FC<Props> = ({ team, children }) => {
  const router = useRouter();

  const { currentUser } = useCurrentUser();

  return (
    <div className="min-vh-100 h-100 pb-md-0 pb-5 mb-md-0 mb-5">
      <StyledDiv className="w-100 p-md-4 p-3">
        <div className="mb-2 d-flex align-items-center">
          <TeamIcon attachmentId={team.iconImageId} size={80} />
          <div className="d-flex flex-column ms-3">
            <h1 className="mb-0 maximum_lines_1">{team.name}</h1>
            <a className="text-decoration-none" href={team.url}>
              {team.url}
            </a>
          </div>
        </div>
        <Nav tabs>
          {navItems.map((v, index) => {
            if (v.onlyAdmin && team.adminUserId !== currentUser?._id) return null;

            return (
              <NavItem key={index} active={v.isActive(router.pathname)}>
                <Link href={v.path(team.productId)}>
                  <NavLink
                    tag="div"
                    className={`${
                      v.isActive(router.pathname) ? 'active border-bottom border-4 text-primary' : 'text-black'
                    } c-pointer bg-transparent border-0 border-primary`}
                  >
                    <span
                      className={`fw-bold fs-1 ${v.isActive(router.pathname) ? 'active border-bottom border-4 text-primary' : 'text-black'}`}
                    >
                      {v.text}
                    </span>
                  </NavLink>
                </Link>
              </NavItem>
            );
          })}
        </Nav>
        {children}
      </StyledDiv>
      {currentUser && <FooterNavbar />}
    </div>
  );
};

const StyledDiv = styled.div`
  min-width: 0%;
`;
