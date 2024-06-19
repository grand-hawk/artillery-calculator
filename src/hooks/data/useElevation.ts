import useDistance from '@/hooks/data/useDistance';
import useHeightmapZ from '@/hooks/data/useHeightmapZ';
import useProjectile from '@/hooks/data/useProjectile';
import {
  calculateHighElevation,
  calculateLowElevation,
  studsToMeters,
} from '@/utils/math';

export default function useElevation(): [number, number] {
  const distance = useDistance();
  const projectile = useProjectile();
  const [gunHeight, targetHeight] = useHeightmapZ();

  const heightDifference =
    studsToMeters(targetHeight) - studsToMeters(gunHeight);

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
