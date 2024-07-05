import Box from '@mui/joy/Box';
import { mergeSx } from 'merge-sx';

import type { BoxProps } from '@mui/joy/Box';
import type { PropsWithChildren } from 'react';

export default function DataContainer({
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  return (
    <Box
      className="datacontainer"
      {...props}
      sx={mergeSx(
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 1,
        },
        props.sx,
      )}
    >
      {children}
    </Box>
  );
}
