import React, { ComponentProps, VFC } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = ComponentProps<typeof MuiTextField>;

export const TextField: VFC<Props> = ({ variant = 'outlined', hiddenLabel = false, ...rest }) => {
  return <StyledMuiTextField variant={variant} hiddenLabel={hiddenLabel} {...rest} />;
};

const StyledMuiTextField = styled(MuiTextField)`
  .MuiOutlinedInput-input {
    color: ${(props) => props.theme.palette.textColor.main};
  }
`;
