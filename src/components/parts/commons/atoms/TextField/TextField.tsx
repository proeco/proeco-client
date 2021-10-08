import React, { ComponentProps, VFC } from 'react';
import { TextField as MuiTextField } from '@mui/material';

type Props = ComponentProps<typeof MuiTextField>;

export const TextField: VFC<Props> = ({ variant = 'outlined', hiddenLabel = false, ...rest }) => {
  return <MuiTextField variant={variant} hiddenLabel={hiddenLabel} {...rest} />;
};
