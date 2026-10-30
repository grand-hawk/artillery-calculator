import React from 'react';

import useDistance from '@/hooks/data/useDistance';
import useHeightDifference from '@/hooks/data/useHeightDifference';
import useProjectile from '@/hooks/data/useProjectile';
import { calculateArcs } from '@/utils/math';

export default function useArcs() {
  const distance = useDistance();
  const projectile = useProjectile();
  const heightDifference = useHeightDifference();

  return React.useMemo(
    () => calculateArcs(projectile, distance, heightDifference),
    [projectile, distance, heightDifference],
  );
}
