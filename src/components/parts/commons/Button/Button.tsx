import React, { FC, ComponentProps } from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

type Bold = {
  bold?: boolean;
};

type Props = ComponentProps<typeof MuiButton> & Bold;

export const Button: FC<Props> = ({ bold, children, ...rest }) => {
  return (
    <>
      <StyledButton {...rest} bold={bold ? 1 : 0}>
        children
      </StyledButton>
      <button className="btn btn-primary bg-primary">{children}</button>
    </>
  );
};

const StyledButton = styled(MuiButton)<{ bold: number }>`
  &.MuiButton-containedSecondary,
  &.MuiButton-containedPrimary,
  &.MuiButton-containedError,
  &.MuiButton-containedGreen {
    color: white;
  }
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;
