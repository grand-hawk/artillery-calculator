import Box from '@mui/joy/Box';
import React from 'react';
import { useIsClient } from 'usehooks-ts';

import Theme from '../utils/Theme';

import type { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  const isClient = useIsClient();

  return (
    <Theme>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          padding: 4,
          minHeight: '100vh',
        }}
      >
        {isClient && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                MozBoxDirection: null,
                lg: '1fr minmax(auto, 50%)',
              },
              gap: 4,
            }}
          >
            {children}
          </Box>
        )}
      </Box>
    </Theme>
  );
}
