import React, { VFC, ComponentProps } from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

type Bold = {
  bold?: boolean;
  maximumLines?: number;
};

type Props = ComponentProps<typeof MuiTypography> & Bold;

export const Typography: VFC<Props> = ({ bold, maximumLines, color = 'textColor.main', ...rest }) => {
  return <StyledTypography color={color} bold={bold ? 1 : 0} maximumLines={maximumLines} {...rest} />;
};

const StyledTypography = styled(MuiTypography)<{ bold: number; maximumLines: number | undefined }>`
  text-transform: none;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  ${(props) =>
    props.maximumLines &&
    `
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${props.maximumLines};
  -webkit-box-orient: vertical;
  `}
`;
