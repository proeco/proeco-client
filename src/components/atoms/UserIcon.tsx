import { memo, VFC } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from '@mui/material';
import styled from 'styled-components';

import { DASHBOARD_PATH } from '../../constants/urls';

export const UserIcon: VFC = memo(() => {
  return (
    <StyledLink href={DASHBOARD_PATH}>
      <StyledPersonOutlineIcon />
    </StyledLink>
  );
});

const StyledLink = styled(Link)`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
`;

const StyledPersonOutlineIcon = styled(PersonOutlineIcon)`
  color: #ccc;
  width: 100%;
  height: auto;
`;
