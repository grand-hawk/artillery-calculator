import Typography from '@mui/joy/Typography';
import { mergeSx } from 'merge-sx';
import React from 'react';

import type { TypographyProps } from '@mui/joy/Typography';

export default function Code({
  children,
  ...props
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <Typography
      variant="solid"
      {...props}
      sx={mergeSx(
        (theme) => ({
          borderRadius: 4,
          backgroundColor: theme.palette.background.body,
          color: theme.palette.text.primary,
          fontFamily: 'monospace',
        }),
        props.sx,
      )}
    >
      {children}
    </Typography>
  );
}
