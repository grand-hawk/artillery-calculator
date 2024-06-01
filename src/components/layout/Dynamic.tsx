import Box from '@mui/joy/Box';
import { useIsClient } from 'usehooks-ts';

import type { PropsWithChildren } from 'react';

export default function Dynamic({ children }: PropsWithChildren) {
  const isClient = useIsClient();

  return (
    isClient && (
      <Box
        sx={{
          display: 'grid',

          gridTemplateColumns: {
            lg: '1fr minmax(auto, 50%)',
          },

          gap: 4,
        }}
      >
        {children}
      </Box>
    )
  );
}
