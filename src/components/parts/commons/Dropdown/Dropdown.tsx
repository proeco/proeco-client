import React, { ReactNode, FC, useState, ComponentProps } from 'react';
import { Menu as MuiMenu } from '@mui/material';
import { Box } from '@mui/system';

type CustomProps = {
  toggle: ReactNode;
};

type Props = Omit<ComponentProps<typeof MuiMenu>, 'open' | 'onClose'> & CustomProps;

export const Dropdown: FC<Props> = ({
  toggle,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'left',
  },
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Box onClick={(e) => setAnchorEl(e.currentTarget)} width="fit-content">
        {toggle}
      </Box>
      <MuiMenu anchorOrigin={anchorOrigin} transformOrigin={transformOrigin} anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {children}
      </MuiMenu>
    </>
  );
};
