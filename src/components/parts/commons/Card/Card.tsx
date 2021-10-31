import React, { VFC, ComponentProps } from 'react';
import { Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';

type Card = {
  padding?: number;
  square?: boolean;
};

type Props = ComponentProps<typeof MuiCard> & Card;

export const Card: VFC<Props> = ({ padding = 20, square = false, ...rest }) => {
  return <StyledMuiCard padding={padding} square={square} {...rest} />;
};

const StyledMuiCard = styled(MuiCard)<{ square: boolean; padding: number }>`
  padding: ${(props) => props.padding}px;
  border-radius: ${(props) => (props.square ? '0px' : '4px')};
`;
