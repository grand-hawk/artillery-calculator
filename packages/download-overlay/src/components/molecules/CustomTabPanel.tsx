import TabPanel from '@mui/joy/TabPanel';
import { mergeSx } from 'merge-sx';
import React from 'react';

import type { TabPanelProps } from '@mui/joy/TabPanel';

export default function CustomTabPanel({
  children,
  ...props
}: React.PropsWithChildren<TabPanelProps>) {
  return (
    <TabPanel
      {...props}
      sx={mergeSx(
        (theme) => ({
          padding: 3,
          borderRadius: 8,
          backgroundColor: theme.palette.background.surface,
          color: theme.palette.text.secondary,
        }),
        props.sx,
      )}
    >
      {children}
    </TabPanel>
  );
}
