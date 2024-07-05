import Box from '@mui/joy/Box';
import { mergeSx } from 'merge-sx';

import type { SxProps } from '@mui/joy/styles/types';
import type { PropsWithChildren } from 'react';

function ColumnContainer({
  children,
  sx = {},
}: PropsWithChildren<{ sx?: SxProps }>) {
  return (
    <Box
      sx={mergeSx(
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        },
        sx,
      )}
    >
      {children}
    </Box>
  );
}

export default ColumnContainer;
