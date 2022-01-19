import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip } from './Tooltip';

export default {
  title: 'parts/commons/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = ({ ...rest }) => {
  return (
    <div className="p-5">
      <Tooltip {...rest}>SampleText</Tooltip>
    </div>
  );
};

export const DefaultTimeLineItem = Template.bind({});
DefaultTimeLineItem.args = {
  text: 'tooltip のタイトルです',
};
