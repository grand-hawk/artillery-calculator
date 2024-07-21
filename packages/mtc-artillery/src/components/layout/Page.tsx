import Box from '@mui/joy/Box';
import React from 'react';
import { useIsClient } from 'usehooks-ts';

import Theme from '@/components/utils/Theme';
import useIsOverlay from '@/hooks/useIsOverlay';
import OverlayView from '@/views/Overlay';

import type { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  const isClient = useIsClient();
  const isOverlay = useIsOverlay();

  return (
    <Theme>
      {/* only render page if client, site breaks otherwise */}
      {isClient &&
        (isOverlay ? (
          <OverlayView />
        ) : (
          <Box
            sx={{
              minHeight: '100svh',
              maxWidth: '100svw',

              padding: 4,

              // setting to grid somehow makes the child 100% height and height: 100% doesnt lol
              display: 'grid',
            }}
          >
            {children}
          </Box>
        ))}
    </Theme>
  );
}
