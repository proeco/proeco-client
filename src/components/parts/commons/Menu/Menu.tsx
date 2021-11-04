import React, { VFC, ComponentProps } from 'react';
import { Menu as MuiMenu, MenuItem, ListItemIcon } from '@mui/material';

type MenuItem = {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
};

type Menu = {
  menuItems: MenuItem[];
};

type Props = ComponentProps<typeof MuiMenu> & Menu;

export const Menu: VFC<Props> = ({
  menuItems,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  children,
  ...rest
}) => {
  return (
    <MuiMenu anchorOrigin={anchorOrigin} transformOrigin={transformOrigin} {...rest}>
      {menuItems.map((menuItem, i) => (
        <MenuItem key={i} onClick={menuItem.onClick}>
          <ListItemIcon>{menuItem.icon}</ListItemIcon>
          {menuItem.text}
        </MenuItem>
      ))}
      {children}
    </MuiMenu>
  );
};
