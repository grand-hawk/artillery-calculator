import Plus from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { Map } from '@/config/maps';

export default function MapItem({ item }: { item: Map }) {
  const t = useTranslations();

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
          src={`/images/webp/maps/${item.image}_small.webp`}
          alt=""
          height={24}
          width={24}
        />
      </Box>

      <Stack direction="row" alignItems="center">
        {item.name}
        {item.heightmap && (
          <Tooltip
            placement="top"
            size="sm"
            variant="plain"
            title={t('typography.heightmap')}
          >
            <Typography color="primary" fontSize={10}>
              <Plus fontSize="small" />
            </Typography>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}
