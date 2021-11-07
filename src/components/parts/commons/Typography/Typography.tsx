import React, { VFC, ComponentProps } from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

type Bold = {
  bold?: boolean;
  maximum_lines?: number;
};

type Props = ComponentProps<typeof MuiTypography> & Bold;

export const Typography: VFC<Props> = ({ bold, maximum_lines, color = 'textColor.main', ...rest }) => {
  return <StyledTypography color={color} bold={bold ? 1 : 0} maximum_lines={maximum_lines} {...rest} />;
};

const StyledTypography = styled(MuiTypography)<{ bold: number; maximum_lines: number | undefined }>`
  text-transform: none;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  ${(props) =>
    props.maximum_lines &&
    `
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${props.maximum_lines};
  -webkit-box-orient: vertical;
  `}
`;
