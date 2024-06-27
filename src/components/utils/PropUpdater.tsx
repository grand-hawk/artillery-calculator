'use client';

import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import { usePropStore } from '@/stores/props';
import fetcher from '@/utils/fetcher';

import type { Props } from '@/stores/props';

export default function PropUpdater() {
  const router = useRouter();

  const currentVersion = usePropStore((s) => s.version);
  const setVersion = usePropStore((s) => s.setVersion);
  const setMotd = usePropStore((s) => s.setMotd);

  const { data, error } = useSWR<Props>('/api/props', {
    refreshInterval: 60_000,
    fetcher,
  });

  if (error) console.error('[PropUpdater]', error);

  React.useEffect(() => {
    if (data?.version !== undefined && data.version !== currentVersion) {
      setVersion(data.version);

      router.push(window.location.href);
    }

    if (data?.motd !== undefined) setMotd(data.motd);
  });

  return <div aria-roledescription="prop updater component" />;
}
