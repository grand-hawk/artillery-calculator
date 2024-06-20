import Box from '@mui/joy/Box';

import type { PropsWithChildren } from 'react';

export default function DataContainer({ children }: PropsWithChildren) {
  return (
    <Box
      className="datacontainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
}
