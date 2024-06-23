import Card from '@mui/joy/Card';
import { mergeSx } from 'merge-sx';

import type { CardProps } from '@mui/joy/Card';
import type { PropsWithChildren } from 'react';

export default function HeaderCard({
  children,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <Card
      orientation="horizontal"
      role="alert"
      size="sm"
      variant="soft"
      {...props}
      sx={mergeSx(
        {
          paddingX: 2,
          maxHeight: 75,
          overflow: 'auto',
        },
        props.sx,
      )}
    >
      {children}
    </Card>
  );
}
