import React, { ComponentProps, VFC } from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { styled } from '@mui/material/styles';

type DividerType = {
  margin: number;
};

type Props = ComponentProps<typeof MuiDivider> & DividerType;

export const Divider: VFC<Props> = ({ margin, ...rest }) => {
  return <StyledMuiDivider margin={margin} {...rest} />;
};

const StyledMuiDivider = styled(MuiDivider)<{ margin: number }>`
  margin: ${(props) => props.margin}px 0;
  border-color: #eaecf1;
`;
