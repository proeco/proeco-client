import { VFC } from 'react';

import styled from 'styled-components';

type Props = {
  value?: string;
  onChange: (inputValue: string) => void;
  isHeader?: boolean;
  placeholder?: string;
};

export const EditableInput: VFC<Props> = (props) => {
  const { value, onChange, isHeader, placeholder } = props;

  return (
    <StyledInput
      className={`form-control text-white text-nowrap overflow-scroll ${isHeader ? 'fs-1' : ''} py-0 pb-md-0 w-100`}
      onChange={(e) => onChange(e.target.value)}
      value={value || ''}
      placeholder={placeholder || ''}
    />
  );
};

const StyledInput = styled.input`
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
