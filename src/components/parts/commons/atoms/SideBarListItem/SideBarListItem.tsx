import React, { VFC, ComponentProps } from 'react';
import ListItemButton from '@mui/material/ListItemButton';

type Props = ComponentProps<typeof ListItemButton>;

export const SideBarListItem: VFC<Props> = ({ children }) => {
  return <ListItemButton>{children}</ListItemButton>;
};
