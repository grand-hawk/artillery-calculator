import Box from '@mui/joy/Box';
import React from 'react';

import Theme from '@/components/utils/Theme';

import type { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  return (
    <Theme>
      <Box
        sx={{
          minHeight: '100svh',
          maxWidth: '100svw',

          padding: 4,

          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            width: '100%',

            marginTop: '5vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </Theme>
  );
}
