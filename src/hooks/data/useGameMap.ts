import { gameMaps } from '@/config/maps';
import { useDataStore } from '@/stores/data';

import type { GameMap } from '@/config/maps';

export default function useGameMap(): GameMap {
  const mapId = useDataStore((s) => s.mapId);
  const gameMap = gameMaps[mapId];
  return gameMap;
}
