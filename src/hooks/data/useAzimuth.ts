import { useDataStore } from '@/stores/data';
import { calculateAzimuth } from '@/utils/math';

export default function useAzimuth(): number {
  const gun = useDataStore((s) => s.getGun());
  const target = useDataStore((s) => s.getTarget());

  const azimuth = calculateAzimuth(gun.x, gun.y, target.x, target.y);

  return azimuth;
}
