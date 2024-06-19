import NextLink from 'next/link';

import type { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';

export default function Link({
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  return (
    <NextLink
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
      target="_blank"
    >
      {children}
    </NextLink>
  );
}
