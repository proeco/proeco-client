import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Link } from './Link';

export default {
  title: 'parts/commons/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = ({ ...rest }) => {
  return (
    <Link {...rest}>
      <p>Linkのテキスト</p>
    </Link>
  );
};

export const Default = Template.bind({});
Default.args = {
  href: '/',
  isShowUnderLine: true,
};
