import Stack from '@mui/joy/Stack';

import type { PropsWithChildren } from 'react';

export default function DataContainer({ children }: PropsWithChildren) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      {children}
    </Stack>
  );
}
