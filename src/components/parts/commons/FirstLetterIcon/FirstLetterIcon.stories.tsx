import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/system';

import { FirstLetterIcon } from './FirstLetterIcon';

export default {
  title: 'parts/commons/FirstLetterIcon',
  component: FirstLetterIcon,
} as ComponentMeta<typeof FirstLetterIcon>;

const Template: ComponentStory<typeof FirstLetterIcon> = ({ ...rest }) => {
  return (
    <Box p="40px" display="flex" alignItems="center" gap="40px">
      <FirstLetterIcon size={40} {...rest} />
      <FirstLetterIcon size={60} {...rest} />
      <FirstLetterIcon size={80} {...rest} />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'Proeco',
};

export const LinkFirstLetterIcon = Template.bind({});
LinkFirstLetterIcon.args = {
  name: 'Proeco',
  isLink: true,
  linkUrl: '/',
};
