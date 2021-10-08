import React, { ComponentProps, VFC } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = ComponentProps<typeof MuiTextField>;

export const TextField: VFC<Props> = ({ variant = 'outlined', ...rest }) => {
  return <StyledMuiTextField variant={variant} {...rest} />;
};

const StyledMuiTextField = styled(MuiTextField)``;
