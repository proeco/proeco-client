import styled from 'styled-components';
import { FC } from 'react';

import { SideBar } from '../SideBar';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const DashboardLayout: FC = ({ children }) => {
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="min-vh-100 d-flex h-100">
      {currentUser && <SideBar currentUser={currentUser} />}
      <StyledDiv className="w-100 p-md-4 p-3">{children}</StyledDiv>
    </div>
  );
};

const StyledDiv = styled.div`
  min-width: 0%;
`;
