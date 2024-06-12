import ky from 'ky';
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

declare global {
  interface Window {
    umami?: {
      track: (event: string) => void;
    };
  }
}

export default function useAdBlockTrack(): boolean {
  const [localStorage, setLocalStorage] = useLocalStorage<{
    date: number;
    value: boolean;
  }>(
    'adblock',
    {
      date: 0,
      value: false,
    },
    {
      serializer(value) {
        return JSON.stringify(value);
      },
      deserializer(value) {
        return JSON.parse(value);
      },
    },
  );

  React.useEffect(() => {
    async function clientHasAdBlock() {
      try {
        await ky.head('https://www3.doubleclick.net/', {
          mode: 'no-cors',
          cache: 'no-store',
          retry: { limit: 0 },
        });
      } catch (error) {
        const blockedByClient = !(error && Object.keys(error).length > 0);

        setLocalStorage({
          date: Date.now(),
          value: blockedByClient,
        });

        if (blockedByClient && window.umami?.track)
          window.umami.track('AdBlock');
      }
    }

    if (Date.now() - localStorage.date >= 1_000 * 60 * 60 * 24)
      clientHasAdBlock();
  }, [localStorage, setLocalStorage]);

  console.log(localStorage);

  return localStorage.value;
}
