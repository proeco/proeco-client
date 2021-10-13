import React, { VFC, ComponentProps } from 'react';
import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/material/styles';

type Card = {
  square?: boolean;
};

type Props = ComponentProps<typeof MuiPaper> & Card;

export const Paper: VFC<Props> = ({ square = false, ...rest }) => {
  return <StyledMuiPaper square={square} {...rest} />;
};

const StyledMuiPaper = styled(MuiPaper)<{ square: boolean }>`
  border-radius: ${(props) => (props.square ? '0px' : '4px')};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
`;
