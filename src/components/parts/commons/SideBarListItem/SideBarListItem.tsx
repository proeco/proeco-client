import React, { VFC, ComponentProps } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/system';
import { ListItemIcon, ListItemText } from '@mui/material';

type SideBarListItemType = {
  icon: JSX.Element;
};

type Props = ComponentProps<typeof ListItemButton> & SideBarListItemType;

export const SideBarListItem: VFC<Props> = ({ children, selected, icon }) => {
  return (
    <StyledListItemButton selected={selected}>
      <StyledListItemIcon>{icon}</StyledListItemIcon>
      <StyledListItemText disableTypography primary={children} />
    </StyledListItemButton>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  padding: 8px;
  border-radius: 4px;
  &.Mui-selected {
    background-color: ${(props) => props.theme.palette.primary.main};
    &:hover {
      background-color: ${(props) => props.theme.palette.primary.main};
      opacity: 0.7;
    }
    .MuiTypography-root {
      color: #fff;
    }
  }
  &:hover {
    background-color: #e3f2fd;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: unset;
  margin-right: 8px;
`;

const StyledListItemText = styled(ListItemText)`
  margin: 0;
`;
