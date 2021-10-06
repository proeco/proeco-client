import Image from 'next/image';
import { memo, VFC } from 'react';
import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

import { UserIcon } from '~/components/domains/user/atoms/UserIcon';

export const NavigationBar: VFC = memo(() => {
  return (
    <StyledAppBar>
      <Image src="/images/Original.svg" alt="Proeco Logo" width={195} height={40} />
      <UserIcon />
    </StyledAppBar>
  );
});

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 12px 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
