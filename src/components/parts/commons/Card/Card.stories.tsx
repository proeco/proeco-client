import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card, FixedImage } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ ...rest }) => {
  return (
    <div className="p-4">
      <Card {...rest}>
        <p>Cardのコンテンツ</p>
      </Card>
    </div>
  );
};

export const DefaultCard = Template.bind({});

export const CardWithImage = Template.bind({});
CardWithImage.args = {
  headerContent: <FixedImage imageUrl="https://itizawa-tech.growi.cloud/attachment/61bb543444194e2b1d023552" />,
};
