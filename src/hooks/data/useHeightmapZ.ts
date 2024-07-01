import useGameMap from '@/hooks/data/useGameMap';
import useHeightmapContext from '@/hooks/useHeightmapContext';
import { useDataStore } from '@/stores/data';

/**
 * @returns [gunHeight, targetHeight]
 */
export default function useHeightmapZ(): [number, number] {
  const heightmapContext = useHeightmapContext();
  const map = useGameMap();

  const gun = useDataStore((s) => s.getGun());
  const target = useDataStore((s) => s.getTarget());

  let gunHeight = 0;
  let targetHeight = 0;

  if (heightmapContext && map.heightmap) {
    const { width, height } = heightmapContext.canvas;

    gunHeight =
      (heightmapContext.getImageData(gun.x * width, gun.y * height, 1, 1)
        .data[0] /
        255) *
      map.heightmap[255];

    targetHeight =
      (heightmapContext.getImageData(target.x * width, target.y * height, 1, 1)
        .data[0] /
        255) *
      map.heightmap[255];
  }

  return [gunHeight, targetHeight];
}
