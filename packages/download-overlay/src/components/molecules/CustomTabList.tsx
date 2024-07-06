import TabList from '@mui/joy/TabList';
import { mergeSx } from 'merge-sx';
import React from 'react';

import type { TabListProps } from '@mui/joy/TabList';

export default function CustomTabList({
  children,
  ...props
}: React.PropsWithChildren<TabListProps>) {
  return (
    <TabList
      disableUnderline
      {...props}
      sx={mergeSx(
        (theme) => ({
          justifyContent: 'space-between',
          flexWrap: {
            xs: 'wrap',
            sm: 'unset',
          },
          gap: 1,

          '& .MuiTab-root': {
            paddingX: 4,
            paddingY: 2,
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 18,
            width: '100%',
            backgroundColor: theme.palette.background.surface,
            color: theme.palette.text.secondary,

            '&:hover': {
              backgroundColor: `${theme.palette.background.surface} !important`,
              color: `${theme.palette.text.secondary} !important`,
            },

            '&.Mui-selected': {
              backgroundColor: `${theme.palette.success[400]} !important`,
              color: `${theme.palette.text.tertiary} !important`,
            },
          },
        }),
        props.sx,
      )}
    >
      {children}
    </TabList>
  );
}
