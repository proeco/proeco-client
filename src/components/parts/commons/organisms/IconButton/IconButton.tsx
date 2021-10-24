import React, { VFC, ComponentProps } from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import { Icon } from '~/components/parts/commons/atoms';

type IconButtonType = {
  icon: ComponentProps<typeof Icon>['icon'];
};

type Props = ComponentProps<typeof MuiIconButton> & IconButtonType;

export const IconButton: VFC<Props> = ({ icon, ...rest }) => {
  return (
    <MuiIconButton {...rest}>
      <Icon icon={icon} />
    </MuiIconButton>
  );
};
