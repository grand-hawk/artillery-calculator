import Box from '@mui/joy/Box';

import type { PropsWithChildren } from 'react';

export default function ConfigurationGroup({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,

        '& > div': {
          alignItems: 'center',
          height: 35,
        },
      }}
    >
      {children}
    </Box>
  );
}
