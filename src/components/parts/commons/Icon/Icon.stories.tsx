import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon, IconMap } from './Icon';

export default {
  title: 'parts/commons/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ({ ...rest }) => {
  return (
    <div className="d-flex flex-wrap">
      {Object.keys(IconMap).map((v, index) => {
        return (
          <div key={index} className="d-flex align-items-center mb-2 p-2">
            <Icon {...rest} icon={v as keyof typeof IconMap} color="BLACK" />
            <span className="fs-4 ms-2">{v}</span>
          </div>
        );
      })}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 24,
};
