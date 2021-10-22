import React, { VFC, ComponentProps } from 'react';
import { MoreVert, Update, Delete, Logout } from '@mui/icons-material';
import { Box } from '@mui/system';

const IconMap = {
  MoreVert: <MoreVert color="inherit" sx={{ width: '100%', height: 'auto', display: 'block' }} />,
  Update: <Update color="inherit" sx={{ width: '100%', height: 'auto', display: 'block' }} />,
  Delete: <Delete color="inherit" sx={{ width: '100%', height: 'auto', display: 'block' }} />,
  Logout: <Logout color="inherit" sx={{ width: '100%', height: 'auto', display: 'block' }} />,
};

type IconType = {
  icon: keyof typeof IconMap;
};

type Props = ComponentProps<typeof Box> & IconType;

export const Icon: VFC<Props> = ({ icon, ...rest }) => {
  return <Box {...rest}>{IconMap[icon]}</Box>;
};
