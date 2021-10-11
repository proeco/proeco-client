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

const Template: ComponentStory<typeof SideBarListItem> = ({ icon, selected }) => {
  return (
    <StyledList>
      <SideBarListItem icon={icon} selected={selected}>
        <Typography variant="body1">ダッシュボード</Typography>
      </SideBarListItem>
    </StyledList>
  );
};

const StyledList = styled(List)`
  width: 280px;
`;

export const Default = Template.bind({});
Default.args = {
  icon: <DashboardOutlinedIcon fontSize="small" sx={{ color: 'textColor.main' }} />,
  selected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  icon: <DashboardOutlinedIcon fontSize="small" sx={{ color: '#fff' }} />,
  selected: true,
};
