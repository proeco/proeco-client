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
    padding: 8px 12px;
  }
  &.MuiFormControl-root {
    ${(props) =>
      props.error ? `border: ${props.theme.palette.error.main} 2px solid;` : `border: ${props.theme.palette.borderColor.main} 2px solid;`}
    border-radius: 4px;
    box-sizing: border-box;
    &:focus-within {
      ${(props) =>
        props.error ? `border: ${props.theme.palette.error.main} 2px solid;` : `border: ${props.theme.palette.primary.main} 2px solid;`}
    }
  }
  .MuiOutlinedInput-root {
    padding: 0px;
    height: 100%;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;