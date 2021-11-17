import React, { VFC } from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '~/components/parts/commons/TextField';

type Props = {
  value?: string;
  onChange: (inputValue: string) => void;
  variant: string;
  placeholder?: string;
  multiline?: boolean;
  error?: boolean;
};

export const EditableText: VFC<Props> = ({ onChange, variant, value = '', placeholder = '', multiline = false, error = false }) => {
  return (
    <StyledTextField
      onChange={(e) => onChange(e.target.value)}
      sx={{ typography: variant }}
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      error={error}
    />
  );
};

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    border: 2px solid transparent;
    background: transparent;
  }
  .MuiOutlinedInput-root {
    font-size: 1em;
  }
  .MuiOutlinedInput-input {
    font-size: 1em;
    &:hover {
      background: #ccc;
      border-radius: 4px;
    }
    &:focus {
      background: transparent;
    }
  }
`;
