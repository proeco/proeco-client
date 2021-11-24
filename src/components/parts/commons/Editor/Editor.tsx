import React, { VFC, useState, ReactNode } from 'react';
import { Box } from '@mui/system';
import { Tab, Tabs } from '@mui/material';

import { TextField, Button } from '~/components/parts/commons';

type TabPanelProps = {
  children: ReactNode;
  index: number;
  value: number;
};

const TabPanel: VFC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && children}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

type Props = {};

export const Editor: VFC<Props> = ({ ...rest }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box bgcolor="white" p="16px" {...rest}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="Editor tabs">
          <Tab label="Markdown" {...a11yProps(0)} />
          <Tab label="Preview" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <TextField fullWidth multiline value="Markdown" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextField fullWidth multiline value="Preview" />
        </TabPanel>
      </Box>
      <Button variant="contained">投稿する</Button>
    </Box>
  );
};
