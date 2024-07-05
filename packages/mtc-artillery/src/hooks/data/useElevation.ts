import useHeightDifference from './useHeightDifference';
import useDistance from '@/hooks/data/useDistance';
import useProjectile from '@/hooks/data/useProjectile';
import { calculateHighElevation, calculateLowElevation } from '@/utils/math';

export default function useElevation(): [number, number] {
  const distance = useDistance();
  const projectile = useProjectile();
  const heightDifference = useHeightDifference();

  const lowElevation = calculateLowElevation(
    distance,
    projectile.velocity,
    heightDifference,
  );

  const highElevation = calculateHighElevation(
    distance,
    projectile.velocity,
    heightDifference,
  );

  return [lowElevation, highElevation];
}
