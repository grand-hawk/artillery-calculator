import { useShallow } from 'zustand/shallow';

import useGameMap from '@/hooks/data/useGameMap';
import useHeightmapContext from '@/hooks/useHeightmapContext';
import { useDataStore } from '@/stores/data';

/**
 * @returns [gunHeight, targetHeight]
 */
export default function useHeightmapZ(): [number, number] {
  const heightmapContext = useHeightmapContext();
  const map = useGameMap();

  const gun = useDataStore(useShallow((s) => s.getGun()));
  const target = useDataStore(useShallow((s) => s.getTarget()));

  let gunHeight = 0;
  let targetHeight = 0;

  if (heightmapContext && map.heightmap) {
    const { width, height } = heightmapContext.canvas;

    const gunData = heightmapContext.getImageData(
      Math.round(gun.x * width),
      Math.round(gun.y * height),
      1,
      1,
    );

    const heightMin = map.heightmap[0];
    const heightMax = map.heightmap[255];
    const heightRange = heightMax - heightMin;
gunHeight = heightMin + (gunData.data[0] / 255) * heightRange;

    const targetData = heightmapContext.getImageData(
      Math.round(target.x * width),
      Math.round(target.y * height),
      1,
      1,
    );

    targetHeight = (targetData.data[0] / 255) * map.heightmap[255];
  }

  return [gunHeight, targetHeight];
}
