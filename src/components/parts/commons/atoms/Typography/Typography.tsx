import React, { VFC, ComponentProps } from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

type Bold = {
  bold?: boolean;
};

type Props = ComponentProps<typeof MuiTypography> & Bold;

export const Typography: VFC<Props> = ({ bold, color = 'textColor.main', ...rest }) => {
  return <StyledTypography color={color} bold={bold ? 1 : 0} {...rest} />;
};

const StyledTypography = styled(MuiTypography)<{ bold: number }>`
  text-transform: none;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;
