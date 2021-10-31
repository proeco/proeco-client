import React, { VFC, ComponentProps } from 'react';
import { MoreVert, Update, Delete, Logout, PersonOutline, DashboardOutlined, Settings, Add, CreateOutlined, Group } from '@mui/icons-material';
import { Box, styled } from '@mui/system';

const IconMap = {
  MoreVert: <MoreVert />,
  Update: <Update />,
  Delete: <Delete />,
  Group: <Group />,
  Logout: <Logout />,
  PersonOutline: <PersonOutline />,
  DashboardOutlined: <DashboardOutlined />,
  Settings: <Settings />,
  Add: <Add />,
  CreateOutlined: <CreateOutlined />,
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
