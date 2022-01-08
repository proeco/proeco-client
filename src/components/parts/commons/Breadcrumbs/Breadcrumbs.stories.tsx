import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs } from './Breadcrumbs';

export default {
  title: 'parts/commons/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <Breadcrumbs {...rest} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  breadcrumbsItems: [
    {
      url: '/teamId',
      label: 'プロダクト',
    },
    {
      url: '/team/story',
      label: 'ストーリーリスト',
    },
    {
      label: 'ストーリー詳細',
    },
  ],
};
