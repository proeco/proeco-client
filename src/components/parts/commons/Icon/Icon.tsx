import React, { VFC, ComponentProps } from 'react';
import { MoreVert, Update, Delete, Logout, PersonOutline, DashboardOutlined, Settings, Add, CreateOutlined, Group, KeyboardArrowDown } from '@mui/icons-material';
import { Box, styled } from '@mui/system';

export const IconMap = {
  Add: <Add />,
  DashboardOutlined: <DashboardOutlined />,
  Delete: <Delete />,
  Group: <Group />,
  Logout: <Logout />,
  MoreVert: <MoreVert />,
  PersonOutline: <PersonOutline />,
  Settings: <Settings />,
  Update: <Update />,
  CreateOutlined: <CreateOutlined />,
  KeyboardArrowDown: <KeyboardArrowDown />,
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
