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
  width: fit-content;
  padding: ${(props) => props.padding}px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
`;
