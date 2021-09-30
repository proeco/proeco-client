import { AppBar } from '@mui/material';
import { memo, VFC } from 'react';
import styled from 'styled-components';

import { UserIcon } from './atoms/UserIcon';

export const NavigationBar: VFC = memo(() => {
  return (
    <StyledAppBar>
      <UserIcon />
    </StyledAppBar>
  );
});

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 12px 20px;
  align-items: center;
  justify-content: right;
  flex-direction: row;
`;
