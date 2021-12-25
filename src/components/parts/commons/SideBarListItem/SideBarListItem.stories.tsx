import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { styled } from '@mui/system';
import { List } from '@mui/material';

import { SideBarListItem } from '~/components/parts/commons';

export default {
  title: 'parts/commons/SideBarListItem',
  component: SideBarListItem,
} as ComponentMeta<typeof SideBarListItem>;

const Template: ComponentStory<typeof SideBarListItem> = ({ icon, selected }) => {
  return (
    <StyledList>
      <SideBarListItem icon={icon} selected={selected}>
        <p>ホーム</p>
      </SideBarListItem>
    </StyledList>
  );
};

const StyledList = styled(List)`
  width: 280px;
`;

export const Default = Template.bind({});
Default.args = {
  selected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
};
