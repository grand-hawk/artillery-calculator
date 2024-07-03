import { guns } from '@/config/projectiles';
import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/config/projectiles';

export default function useProjectile(): Projectile {
  const projectileData = useDataStore((s) => s.projectile);
  const setProjectile = useDataStore((s) => s.setProjectile);

  const gun = guns[projectileData.gunKey];
  // gun doesn't exist anymore, reset to default
  if (!gun) setProjectile(Object.keys(guns)[0], 0);

  const projectile = gun.projectiles[projectileData.index];
  // projectile doesn't exist anymore, reset to the first
  if (!projectile) setProjectile(projectileData.gunKey, 0);

  return projectile;
}
