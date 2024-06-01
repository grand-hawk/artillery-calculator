import todec from '2dec';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';

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
  const [projectileData, setProjectile] = useDataStore((s) => [
    s.projectile,
    s.setProjectile,
  ]);

  return (
    <Button
      key={thisProjectileIndex}
      color="neutral"
      variant="soft"
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
      size="sm"
      onClick={() => setProjectile(gunKey, thisProjectileIndex)}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: 2,
        }}
      >
        <Typography>
          {projectile.name}
          {projectile.explosiveMass && (
            <Tooltip
              placement="top"
              size="sm"
              variant="plain"
              title="This projectile has blast radius data"
            >
              <Typography color="success">*</Typography>
            </Tooltip>
          )}
        </Typography>

        <Typography level="body-sm" fontWeight={500}>
          {todec(projectile.velocity)} m/s
        </Typography>
      </Stack>
    </Button>
  );
}
