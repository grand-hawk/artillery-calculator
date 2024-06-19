import useHeightmapZ from '@/hooks/data/useHeightmapZ';
import useMap from '@/hooks/data/useMap';
import { useDataStore } from '@/stores/data';
import { calculateDistance, studsToMeters } from '@/utils/math';

export default function useDistanceWithHeight(): number {
  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);
  const map = useMap();
  const [gunHeight, targetHeight] = useHeightmapZ();

  const distanceWithHeight = studsToMeters(
    calculateDistance(
      gun.x * map.size,
      gun.y * map.size,
      target.x * map.size,
      target.y * map.size,
      gunHeight,
      targetHeight,
    ),
  );

  return distanceWithHeight;
}
