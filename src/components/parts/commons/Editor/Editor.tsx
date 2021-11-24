import React, { VFC, useState } from 'react';
import { Box } from '@mui/system';
import { Tab } from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';

import { TextField, Button } from '~/components/parts/commons';

export const Editor: VFC = () => {
  const [value, setValue] = useState('Markdown');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box bgcolor="white" p="16px">
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="Editor tabs">
          <Tab label="Markdown" value="Markdown" />
          <Tab label="Preview" value="Preview" />
        </TabList>
        <TabPanel value="Markdown">
          <TextField fullWidth multiline value="Markdown" />
        </TabPanel>
        <TabPanel value="Preview">
          <TextField fullWidth multiline value="Preview" />
        </TabPanel>
      </TabContext>
      <Button variant="contained">投稿する</Button>
    </Box>
  );
};
