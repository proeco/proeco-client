import React, { ReactNode, FC, useState, ComponentProps } from 'react';
import { Menu as MuiMenu } from '@mui/material';
import { Box } from '@mui/system';

type CustomProps = {
  toggle: ReactNode;
};

type Props = ComponentProps<typeof MuiMenu> & CustomProps;

export const Dropdown: FC<Props> = ({
  toggle,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Box onClick={(e) => setAnchorEl(e.currentTarget)}>{toggle}</Box>
      <MuiMenu anchorOrigin={anchorOrigin} transformOrigin={transformOrigin} anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {children}
      </MuiMenu>
    </>
  );
};
