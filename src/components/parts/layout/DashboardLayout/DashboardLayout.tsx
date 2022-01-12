import styled from 'styled-components';
import { FC } from 'react';

import { FooterNavbar } from '../FooterNavbar';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const DashboardLayout: FC = ({ children }) => {
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="min-vh-100 d-flex h-100 pb-md-0 pb-5 mb-md-0 mb-5">
      <StyledDiv className="w-100 p-md-4 p-3">{children}</StyledDiv>
      {currentUser && <FooterNavbar />}
    </div>
  );
};

const StyledDiv = styled.div`
  min-width: 0%;
`;
