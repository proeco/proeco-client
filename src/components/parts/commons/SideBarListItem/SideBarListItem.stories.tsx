import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { styled } from '@mui/system';
import { List } from '@mui/material';

import { Typography, Icon, SideBarListItem } from '~/components/parts/commons/atoms';

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
  icon: <Icon icon="DashboardOutlined" width="20px" color="textColor.main" />,
  selected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  icon: <Icon icon="DashboardOutlined" width="20px" color="#fff" />,
  selected: true,
};
