import React, { VFC, ComponentProps } from 'react';
import { Menu as MuiMenu, MenuItem, ListItemIcon } from '@mui/material';

type MenuItem = {
  icon: JSX.Element;
  text: string;
};

type Menu = {
  menuItemArray: MenuItem[];
};

type Props = ComponentProps<typeof MuiMenu> & Menu;

export const Menu: VFC<Props> = ({ menuItemArray, ...rest }) => {
  return (
    <MuiMenu {...rest}>
      {menuItemArray.map((menuItem, i) => (
        <MenuItem key={i}>
          <ListItemIcon>{menuItem.icon}</ListItemIcon>
          {menuItem.text}
        </MenuItem>
      ))}
    </MuiMenu>
  );
};
