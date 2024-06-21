import type { useLocalStorage } from 'usehooks-ts';

export type UseLocalStorageOptions<T> = NonNullable<
  Parameters<typeof useLocalStorage<T>>[2]
>;

export const jsonSerializers: UseLocalStorageOptions<boolean> = {
  serializer(value) {
    return String(value);
  },
  deserializer(value) {
    return value === 'true';
  },
};
