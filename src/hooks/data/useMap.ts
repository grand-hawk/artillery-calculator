import { maps } from '@/config/maps';
import { useDataStore } from '@/stores/data';

import type { Map } from '@/config/maps';

export default function useMap(): Map {
  const mapIndex = useDataStore((s) => s.mapIndex);

  const map = maps[mapIndex];

  return map;
}
