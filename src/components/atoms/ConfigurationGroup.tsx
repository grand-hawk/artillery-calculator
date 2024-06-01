import Stack from '@mui/joy/Stack';

import type { PropsWithChildren } from 'react';

export default function ConfigurationGroup({ children }: PropsWithChildren) {
  return (
    <Stack
      spacing={1}
      sx={{
        '& > div': {
          alignItems: 'center',
          height: 35,
        },
      }}
    >
      {children}
    </Stack>
  );
}
