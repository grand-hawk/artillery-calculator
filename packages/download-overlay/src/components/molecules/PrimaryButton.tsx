import Button from '@mui/joy/Button';
import { hexToRgb } from '@mui/material';
import { mergeSx } from 'merge-sx';
import React from 'react';

import type { ButtonProps } from '@mui/joy/Button';

export default function PrimaryButton({
  children,
  ...props
}: React.PropsWithChildren<
  ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>) {
  return (
    <Button
      component="a"
      variant="solid"
      {...props}
      sx={mergeSx(
        (theme) => ({
          paddingX: 4,
          minHeight: 50,
          borderRadius: 8,
          fontSize: 16,
          color: theme.palette.text.tertiary,
          backgroundColor: theme.palette.primary[200],
          borderColor: hexToRgb(theme.palette.neutral[100])
            .replace('rgb', 'rgba')
            .replace(')', ', 0.5)'),
          borderWidth: 2,
          width: '100%',

          '&:hover': {
            backgroundColor: theme.palette.primary[300],
          },
        }),
        props.sx,
      )}
    >
      {children}
    </Button>
  );
}
