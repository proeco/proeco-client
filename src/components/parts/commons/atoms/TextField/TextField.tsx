import React, { ComponentProps, VFC } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = ComponentProps<typeof MuiTextField>;

export const TextField: VFC<Props> = ({ variant = 'outlined', hiddenLabel, ...rest }) => {
  return <StyledMuiTextField variant={variant} hiddenLabel={hiddenLabel} {...rest} />;
};

const StyledMuiTextField = styled(MuiTextField)`
  .MuiOutlinedInput-root {
    border-radius: 0;
    padding: 8px;
  }
  .MuiOutlinedInput-input {
    padding: 0px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${(props) => props.theme.palette.black.main};
  }
`;
