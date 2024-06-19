import { useDataStore } from '@/stores/data';
import { calculateAzimuth } from '@/utils/math';

export default function useAzimuth(): number {
  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  const azimuth = calculateAzimuth(gun.x, gun.y, target.x, target.y);

  return azimuth;
}
