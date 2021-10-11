import React, { VFC, ComponentProps } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/system';
import { ListItemIcon, ListItemText } from '@mui/material';

type SideBarListItemType = {
  typography: JSX.Element;
};

type Props = ComponentProps<typeof ListItemButton> & SideBarListItemType;

export const SideBarListItem: VFC<Props> = ({ children, selected, typography }) => {
  return (
    <StyledListItemButton selected={selected}>
      <StyledListItemIcon>{children}</StyledListItemIcon>
      <StyledListItemText disableTypography primary={typography} />
    </StyledListItemButton>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  padding: 8px;
  border-radius: 4px;
  &.Mui-selected {
    background-color: ${(props) => props.theme.palette.primary.main};
    .MuiSvgIcon-root {
      color: #fff;
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
