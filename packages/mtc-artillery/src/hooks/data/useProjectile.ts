import React from 'react';

import useGuns from '@/hooks/data/useGuns';
import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/config/guns';

export default function useProjectile(): Projectile {
  const guns = useGuns();

  const projectileData = useDataStore((s) => s.projectile);
  const setProjectile = useDataStore((s) => s.setProjectile);

  const gunKey =
    projectileData.gunKey in guns
      ? projectileData.gunKey
      : Object.keys(guns)[0];
  const gun = guns[gunKey];

  const index =
    gunKey === projectileData.gunKey && gun.projectiles[projectileData.index]
      ? projectileData.index
      : 0;

  React.useEffect(() => {
    if (gunKey !== projectileData.gunKey || index !== projectileData.index)
      setProjectile(gunKey, index);
  }, [gunKey, index, projectileData, setProjectile]);

  return gun.projectiles[index];
}
