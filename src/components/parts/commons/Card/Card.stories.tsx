import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { Typography, Card } from '~/components/parts/commons';

export default {
  title: 'parts/commons/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ padding, square, ...rest }) => {
  return (
    <Box p="40px" bgcolor="gray">
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