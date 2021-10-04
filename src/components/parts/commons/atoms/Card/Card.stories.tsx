import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';
import { Typography } from '../../atoms';
import { Card } from './Card';

export default {
  title: 'parts/commons/atoms/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ padding, square, ...rest }) => {
  return (
    <Box>
      <Card padding={padding} square={square} {...rest}>
        <Typography>Cardのコンテンツ</Typography>
      </Card>
    </Box>
  );
};

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  square: false,
};

export const SquareCard = Template.bind({});
SquareCard.args = {
  square: true,
};
