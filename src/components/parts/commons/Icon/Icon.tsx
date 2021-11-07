import React, { VFC, ComponentProps } from 'react';
import {
  Add,
  CreateOutlined,
  DashboardOutlined,
  Delete,
  Group,
  HistoryEdu,
  KeyboardArrowDown,
  Logout,
  MoreVert,
  PersonOutline,
  Settings,
  Update,
} from '@mui/icons-material';
import { Box, styled } from '@mui/system';

export const IconMap = {
  Add: <Add />,
  CreateOutlined: <CreateOutlined />,
  DashboardOutlined: <DashboardOutlined />,
  Delete: <Delete />,
  Group: <Group />,
  HistoryEdu: <HistoryEdu />,
  KeyboardArrowDown: <KeyboardArrowDown />,
  Logout: <Logout />,
  MoreVert: <MoreVert />,
  PersonOutline: <PersonOutline />,
  Settings: <Settings />,
  Update: <Update />,
};

type IconType = {
  icon: keyof typeof IconMap;
};

type Props = ComponentProps<typeof Box> & IconType;

export const Icon: VFC<Props> = ({ icon, ...rest }) => {
  return <StyledBox {...rest}>{IconMap[icon]}</StyledBox>;
};

const StyledBox = styled(Box)`
  .MuiSvgIcon-root {
    width: 100%;
    height: auto;
    display: block;
    color: inherit;
  }
`;
