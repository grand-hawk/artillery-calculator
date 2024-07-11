import Card from '@mui/joy/Card';
import { mergeSx } from 'merge-sx';

import type { CardProps } from '@mui/joy/Card';
import type { PropsWithChildren } from 'react';

export default function WarningCard({
  children,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <Card
      {...props}
      sx={mergeSx(
        (theme) => ({
          borderWidth: 2,
          borderColor: theme.palette.warning[300],
          backgroundColor: '#f0b23215',
        }),
        props.sx,
      )}
    >
      {children}
    </Card>
  );
}
