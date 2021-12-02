import React, { ComponentProps, VFC } from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { styled } from '@mui/material/styles';

type DividerType = {
  margin?: number;
};

type Props = Pick<ComponentProps<typeof MuiDivider>, 'orientation'> & DividerType;

export const Divider: VFC<Props> = ({ margin = 0, orientation = 'horizontal' }) => {
  return <StyledMuiDivider margin={margin} orientation={orientation} />;
};

const StyledMuiDivider = styled(MuiDivider)<{
  margin: number;
  orientation: 'vertical' | 'horizontal' | undefined;
}>`
  margin: ${(props) => (props.orientation === 'vertical' ? `0 ${props.margin}px` : `${props.margin}px 0`)};
  height: auto;
  border-color: ${(props) => props.theme.palette.borderColor.main};
`;
