import Plus from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { GameMap } from '@/config/maps';

export default function MapItem({ gameMap }: { gameMap: GameMap }) {
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
          alt={gameMap.name}
          height={24}
          src={`/images/square/webp/maps/${gameMap.image}.webp`}
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
        {gameMap.name}

        {gameMap.heightmap && (
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
