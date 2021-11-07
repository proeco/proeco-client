import React, { VFC, ComponentProps } from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

type Bold = {
  bold?: boolean;
  MaximumLines?: number;
};

type Props = ComponentProps<typeof MuiTypography> & Bold;

export const Typography: VFC<Props> = ({ bold, MaximumLines = 1, color = 'textColor.main', ...rest }) => {
  return <StyledTypography color={color} bold={bold ? 1 : 0} MaximumLines={MaximumLines} {...rest} />;
};

const StyledTypography = styled(MuiTypography)<{ bold: number; MaximumLines: number }>`
  text-transform: none;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${(props) => props.MaximumLines};
  -webkit-box-orient: vertical;
`;
