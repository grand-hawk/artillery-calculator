import Plus from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { Map } from '@/config/maps';

export default function MapItem({ item }: { item: Map }) {
  const t = useTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
      }}
    >
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
          alt={item.name}
          height={24}
          src={`/images/webp/maps/${item.image}_small.webp`}
          width={24}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {item.name}

        {item.heightmap && (
          <Tooltip
            placement="top"
            size="sm"
            title={t('typography.heightmap')}
            variant="plain"
          >
            <Typography color="primary" sx={{ fontSize: 10 }}>
              <Plus fontSize="small" />
            </Typography>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
