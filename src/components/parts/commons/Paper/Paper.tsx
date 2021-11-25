import React, { VFC, ComponentProps } from 'react';
import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/material/styles';

type Paper = {
  padding?: number;
};

type Props = ComponentProps<typeof MuiPaper> & Paper;

export const Paper: VFC<Props> = ({ padding = 20, ...rest }) => {
  return <StyledMuiPaper padding={padding} {...rest} />;
};

const StyledMuiPaper = styled(MuiPaper)<{ padding: number }>`
  padding: ${(props) => props.padding}px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px;
`;
