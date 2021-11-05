import React, { VFC, ComponentProps } from 'react';
import { SpeedDial as MuiSpeedDial, SpeedDialIcon } from '@mui/material';

type Props = ComponentProps<typeof MuiSpeedDial>;

export const SpeedDial: VFC<Props> = ({ ariaLabel = 'SpeedDial', ...rest }) => {
  return <MuiSpeedDial ariaLabel={ariaLabel} icon={<SpeedDialIcon />} {...rest} />;
};
