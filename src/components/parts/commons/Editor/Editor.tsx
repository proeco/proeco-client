import React, { VFC, useState } from 'react';
import { Box } from '@mui/system';
import { Tab } from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';

import { TextField, Button } from '~/components/parts/commons';

export const Editor: VFC = () => {
  const [value, setValue] = useState<'editor' | 'preview'>('editor');

  const handleChange = (event: React.SyntheticEvent, newValue: 'editor' | 'preview') => {
    setValue(newValue);
  };

  return (
    <Box bgcolor="white" p="16px">
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="Editor tabs">
          <Tab label="editor" value="editor" />
          <Tab label="preview" value="preview" />
        </TabList>
        <TabPanel value="editor">
          <TextField fullWidth multiline value="editor" />
        </TabPanel>
        <TabPanel value="preview">
          <TextField fullWidth multiline value="preview" />
        </TabPanel>
      </TabContext>
      <Button variant="contained">投稿する</Button>
    </Box>
  );
};
