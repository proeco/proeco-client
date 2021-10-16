import React, { VFC, ComponentProps } from 'react';
import { Menu as MuiMenu } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = ComponentProps<typeof MuiMenu>;

export const Menu: VFC<Props> = ({ ...rest }) => {
  return <StyledMuiMenu {...rest} />;
};

const StyledMuiMenu = styled(MuiMenu)``;
