import React, { VFC, ComponentProps } from 'react';
import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

type Props = ComponentProps<typeof MuiButton>;

export const Button: VFC<Props> = ({ ...rest }) => {
  return <StyledButton {...rest} />;
};

const StyledButton = styled(MuiButton)`
  &.MuiButton-containedSecondary {
    color: white;
  }
`;
