import { useDataStore } from '@/stores/data';
import { calculateAzimuth } from '@/utils/math';
import { useShallow } from 'zustand/shallow';

export default function useAzimuth(): number {
  const gun = useDataStore(useShallow((s) => s.getGun()));
  const target = useDataStore(useShallow((s) => s.getTarget()));

  const azimuth = calculateAzimuth(gun.x, gun.y, target.x, target.y);

  return azimuth;
}
