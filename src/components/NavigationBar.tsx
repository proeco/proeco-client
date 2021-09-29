import { Container } from '@mui/material';
import { memo, VFC } from 'react';
import styled from 'styled-components';

import { UserIcon } from './atoms/UserIcon';

export const NavigationBar: VFC = memo(() => {
  return (
    <SContainer>
      <UserIcon />
    </SContainer>
  );
});

const SContainer = styled(Container)`
  background-color: ${(props) => props.theme.palette.primary.main};
  width: 100%;
  max-width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: right;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
`;
