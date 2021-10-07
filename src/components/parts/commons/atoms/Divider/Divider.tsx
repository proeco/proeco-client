import React, { ComponentProps, VFC } from 'react';
import { Divider as MuiDivider } from '@mui/material';
import { styled } from '@mui/material/styles';

type DividerType = {
  margin?: number;
};

type Props = ComponentProps<typeof MuiDivider> & DividerType;

export const Divider: VFC<Props> = ({ margin = 0, orientation = 'horizontal', ...rest }) => {
  return <StyledMuiDivider margin={margin} orientation={orientation} {...rest} />;
};

const StyledMuiDivider = styled(MuiDivider)<{
  margin: number;
  orientation: 'vertical' | 'horizontal' | undefined;
}>`
  margin: ${(props) => (props.orientation === 'vertical' ? `0 ${props.margin}px` : `${props.margin}px 0`)};
  border-color: ${(props) => props.theme.palette.borderColor.main};
`;
