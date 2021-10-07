import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/system';

import { Divider } from '~/components/parts/commons/atoms/Divider';

export default {
  title: 'parts/commons/atoms/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = ({ margin, orientation, ...rest }) => {
  return (
    <Box width="600px" height="600px">
      <Divider margin={margin} orientation={orientation} {...rest} />
    </Box>
  );
};

export const horizontalDivider = Template.bind({});
horizontalDivider.args = {
  margin: 10,
  orientation: 'horizontal',
};

export const verticalDivider = Template.bind({});
verticalDivider.args = {
  margin: 10,
  orientation: 'vertical',
};
