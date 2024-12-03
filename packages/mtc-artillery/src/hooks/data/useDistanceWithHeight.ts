import useGameMap from '@/hooks/data/useGameMap';
import useHeightmapZ from '@/hooks/data/useHeightmapZ';
import { useDataStore } from '@/stores/data';
import { calculateDistance, studsToMeters } from '@/utils/math';
import { useShallow } from 'zustand/shallow';

export default function useDistanceWithHeight(): number {
  const gun = useDataStore(useShallow((s) => s.getGun()));
  const target = useDataStore(useShallow((s) => s.getTarget()));

  const map = useGameMap();
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
