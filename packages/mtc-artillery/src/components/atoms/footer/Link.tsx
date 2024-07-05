import JoyLink from '@mui/joy/Link';
import { mergeSx } from 'merge-sx';
import NextLink from 'next/link';

import type { LinkProps } from '@mui/joy/Link';
import type { PropsWithChildren } from 'react';

export default function Link({
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  return (
    <JoyLink
      href={props.href!}
      {...props}
      component={NextLink}
      sx={mergeSx(
        (theme) => ({
          color: theme.palette.text.icon,
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }),
        props.sx,
      )}
      target="_blank"
    >
      {children}
    </JoyLink>
  );
}
