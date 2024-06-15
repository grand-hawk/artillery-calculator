import { maps } from '@/config/maps';
import useHeightmapContext from '@/hooks/useHeightmapContext';
import { useDataStore } from '@/stores/data';

/**
 * @returns [gunHeight, targetHeight]
 */
export default function useHeightmapZ(): [number, number] {
  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];

  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  let gunHeight = 0;
  let targetHeight = 0;

  const heightmapContext = useHeightmapContext();

  if (heightmapContext && map.heightmap) {
    gunHeight =
      (heightmapContext.getImageData(
        gun.x * map.heightmap.width,
        gun.y * map.heightmap.height,
        1,
        1,
      ).data[0] /
        255) *
      map.heightmap[255];

    targetHeight =
      (heightmapContext.getImageData(
        target.x * map.heightmap.width,
        target.y * map.heightmap.height,
        1,
        1,
      ).data[0] /
        255) *
      map.heightmap[255];
  }

  return [gunHeight, targetHeight];
}
