import useHeightmapZ from './useHeightmapZ';
import { studsToMeters } from '@/utils/math';

export default function useHeightDifference() {
  const [gunHeight, targetHeight] = useHeightmapZ();

  const heightDifference =
    studsToMeters(targetHeight) - studsToMeters(gunHeight);

  return heightDifference;
}
