import { defaultMapId, gameMaps } from '@/config/maps';
import { useDataStore } from '@/stores/data';

import type { GameMap } from '@/config/maps';

export default function useGameMap(): GameMap {
  const mapId = useDataStore((s) => s.mapId);
  const setMapId = useDataStore((s) => s.setMapId);

  const gameMap = gameMaps[mapId];
  if (!gameMap) setMapId(defaultMapId);

  return gameMap;
}
