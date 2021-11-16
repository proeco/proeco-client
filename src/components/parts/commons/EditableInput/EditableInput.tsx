import React, { VFC, ComponentProps } from 'react';
import { Input } from '@mui/material';
import { styled } from '@mui/material/styles';

type EditableInputType = {
  value?: string;
  onChange: (inputValue: string) => void;
  variant: string;
  placeholder?: string;
};

type Props = ComponentProps<typeof Input> & EditableInputType;

export const EditableInput: VFC<Props> = ({ value, onChange, placeholder, ...rest }) => {
  return <StyledInput onChange={(e) => onChange(e.target.value)} value={value || ''} placeholder={placeholder || ''} {...rest} />;
};

const StyledInput = styled(Input)`
  background: transparent;
  border: none;

  &:hover {
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;
