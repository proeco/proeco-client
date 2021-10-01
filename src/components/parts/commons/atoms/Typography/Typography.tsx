import React, { VFC, ComponentProps } from 'react';
import { Typography as MuiTypography } from '@mui/material';
import styled from 'styled-components';

type Bold = {
  bold?: boolean;
};

type Props = ComponentProps<typeof MuiTypography> & Bold;

export const Typography: VFC<Props> = ({ bold, ...rest }) => {
  return <StyledTypography bold={bold} {...rest} />;
};

const StyledTypography = styled(MuiTypography)<{ bold?: boolean }>`
  text-transform: none;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;
