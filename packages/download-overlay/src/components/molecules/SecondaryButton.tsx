import { mergeSx } from 'merge-sx';
import React from 'react';

import PrimaryButton from './PrimaryButton';

export default function SecondaryButton({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof PrimaryButton>>) {
  return (
    <PrimaryButton
      variant="outlined"
      {...props}
      sx={mergeSx(
        (theme) => ({
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.level1,

          '&:hover': {
            backgroundColor: theme.palette.background.level2,
          },
        }),
        props.sx,
      )}
    >
      {children}
    </PrimaryButton>
  );
}
