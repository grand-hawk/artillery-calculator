import { useLocalStorage } from 'usehooks-ts';

export default function useIsOverlay() {
  const [isOverlay] = useLocalStorage<boolean>('overlay-client', false, {
    serializer(value) {
      return String(value);
    },
    deserializer(value) {
      return value === 'true';
    },
  });

  return isOverlay;
}
