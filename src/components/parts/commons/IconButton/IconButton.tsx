import React, { VFC, ComponentProps } from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import { Icon } from '~/components/parts/commons';

type IconButtonType = {
  icon: ComponentProps<typeof Icon>['icon'];
  width: number;
};

type Props = ComponentProps<typeof MuiIconButton> & IconButtonType;

export const IconButton: VFC<Props> = ({ icon, width, ...rest }) => {
  return (
    <MuiIconButton {...rest}>
      <Icon icon={icon} width={width} />
    </MuiIconButton>
  );
};
