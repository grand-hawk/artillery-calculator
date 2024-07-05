import Box from '@mui/joy/Box';
import { mergeSx } from 'merge-sx';

import type { BoxProps } from '@mui/joy/Box';

export default function Circle({ ...props }: BoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        component="span"
        {...props}
        sx={mergeSx(
          {
            borderRadius: '50%',
            height: 8,
            width: 8,
          },
          props.sx,
        )}
      />
    </Box>
  );
}
