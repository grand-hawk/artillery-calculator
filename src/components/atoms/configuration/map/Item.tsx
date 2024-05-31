import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Image from 'next/image';

import type { Map } from '@/config/maps';

export default function MapItem({ item }: { item: Map }) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',

          '& img': {
            borderRadius: theme.radius.sm,
          },
        })}
      >
        <Image
          src={`/images/webp/${item.image}_small.webp`}
          alt=""
          height={24}
          width={24}
        />
      </Box>

      {item.name}
    </Stack>
  );
}
