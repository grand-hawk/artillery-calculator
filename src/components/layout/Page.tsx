import Box from '@mui/joy/Box';
import React from 'react';
import { useIsClient } from 'usehooks-ts';

import Theme from '@/components/utils/Theme';

import type { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  const isClient = useIsClient();

  return (
    <Theme>
      <Box
        sx={{
          padding: 4,

          minHeight: '100svh',
          width: '100%',

          // setting to grid somehow makes the child 100% height and height: 100% doesnt lol
          display: 'grid',
        }}
      >
        {/* only render page if client, site breaks otherwise */}
        {isClient && children}
      </Box>
    </Theme>
  );
}
