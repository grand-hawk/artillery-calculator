import useMap from '@/hooks/data/useMap';
import { useDataStore } from '@/stores/data';
import { calculateDistance, studsToMeters } from '@/utils/math';

export default function useDistance(): number {
  const map = useMap();

  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  const distance = studsToMeters(
    calculateDistance(gun.x, gun.y, target.x, target.y) * map.size,
  );

  return distance;
}
