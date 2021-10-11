import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { styled } from '@mui/system';
import { List } from '@mui/material';
import { DashboardOutlined as DashboardOutlinedIcon } from '@mui/icons-material';

import { SideBarListItem } from '~/components/parts/commons/atoms/SideBarListItem';
import { Typography } from '~/components/parts/commons/atoms';

export default {
  title: 'parts/commons/atoms/SideBarListItem',
  component: SideBarListItem,
} as ComponentMeta<typeof SideBarListItem>;

const Template: ComponentStory<typeof SideBarListItem> = ({ typography, selected }) => {
  return (
    <StyledList>
      <SideBarListItem typography={typography} selected={selected}>
        <StyledDashboardOutlinedIcon fontSize="small" />
      </SideBarListItem>
    </StyledList>
  );
};

const StyledList = styled(List)`
  width: 280px;
`;

const StyledDashboardOutlinedIcon = styled(DashboardOutlinedIcon)`
  color: ${(props) => props.theme.palette.textColor.main};
`;

export const Default = Template.bind({});
Default.args = {
  typography: <Typography variant="body1">ダッシュボード</Typography>,
  selected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  typography: <Typography variant="body1">ダッシュボード</Typography>,
  selected: true,
};
