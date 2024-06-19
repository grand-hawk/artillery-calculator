import { guns } from '@/config/projectiles';
import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/config/projectiles';

export default function useProjectile(): Projectile {
  const projectileData = useDataStore((s) => s.projectile);

  const projectile =
    guns[projectileData.gunKey].projectiles[projectileData.index];

  return projectile;
}
