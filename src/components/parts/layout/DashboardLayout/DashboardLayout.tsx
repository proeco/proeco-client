import styled from 'styled-components';
import { FC } from 'react';

import { SideBar } from '../SideBar';
import { useCurrentUser } from '~/stores/user/useCurrentUser';

export const DashboardLayout: FC = ({ children }) => {
  const { data: currentUser } = useCurrentUser();
  return (
    <StyledDiv className="d-flex h-100">
      {currentUser && <SideBar currentUser={currentUser} />}
      <div className="w-100 p-md-4 p-3">{children}</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  min-height: 100vh;
  min-width: 0%;
`;
