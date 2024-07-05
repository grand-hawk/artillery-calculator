import Box from '@mui/joy/Box';
import { mergeSx } from 'merge-sx';

import type { SxProps } from '@mui/joy/styles/types';
import type { PropsWithChildren } from 'react';

export default function RowContainer({
  children,
  sx = {},
}: PropsWithChildren<{ sx?: SxProps }>) {
  return (
    <Box
      sx={mergeSx(
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,

          '& .datacontainer': {
            flexDirection: 'column',
            gap: 0,
          },
        },
        sx,
      )}
    >
      {children}
    </Box>
  );
}
