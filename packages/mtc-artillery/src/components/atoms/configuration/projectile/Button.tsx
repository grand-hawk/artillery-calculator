import todec from '2dec';
import Plus from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';

import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/config/projectiles';

export default function ProjectileButton({
  gunKey,
  projectile,
  thisProjectileIndex,
}: {
  gunKey: string;
  projectile: Projectile;
  thisProjectileIndex: number;
}) {
  const t = useTranslations();

  const projectileData = useDataStore((s) => s.projectile);
  const setProjectile = useDataStore((s) => s.setProjectile);

  return (
    <Button
      key={thisProjectileIndex}
      color="neutral"
      size="sm"
      sx={(theme) => ({
        borderRadius: 0,
        fontWeight: 400,

        ...(thisProjectileIndex === projectileData.index &&
          gunKey === projectileData.gunKey && {
            backgroundColor: theme.palette.neutral.softActiveBg,
            '&:hover': {
              backgroundColor: theme.palette.neutral.softActiveBg,
            },
          }),
      })}
      variant="soft"
      onClick={() => setProjectile(gunKey, thisProjectileIndex)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,

          width: '100%',
        }}
      >
        <Typography display="flex">
          {projectile.name}

          {projectile.explosiveMass && (
            <Tooltip
              placement="top"
              size="sm"
              title={t('typography.blastRange')}
              variant="plain"
            >
              <Typography color="primary" fontSize={12}>
                <Plus />
              </Typography>
            </Tooltip>
          )}
        </Typography>

        <Typography fontWeight={500} level="body-sm">
          {t('typography.metersPerSecond', {
            value: todec(projectile.velocity),
          })}
        </Typography>
      </Box>
    </Button>
  );
}
