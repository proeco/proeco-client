import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip } from './Tooltip';

export default {
  title: 'parts/commons/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = ({ ...rest }) => {
  return <Tooltip {...rest}>SampleText</Tooltip>;
};

export const DefaultTimeLineItem = Template.bind({});
DefaultTimeLineItem.args = {
  text: 'tooltip のタイトルです',
};
