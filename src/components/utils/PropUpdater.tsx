'use client';

import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import { PropsMaxAge } from '@/lib/server/getProps';
import { usePropStore } from '@/stores/props';
import fetcher from '@/utils/fetcher';

import type { Props } from '@/stores/props';

export default function PropUpdater() {
  const router = useRouter();

  const currentVersion = usePropStore((s) => s.version);
  const setMotd = usePropStore((s) => s.setMotd);

  const { data, error } = useSWR<Props>('/api/props', {
    refreshInterval: PropsMaxAge * 1_000,
    fetcher,
  });

  if (error) console.warn('[PropUpdater]', error);

  React.useEffect(() => {
    // refresh page after 15 seconds to ensure that the deployment's rolling update was successful
    if (data?.version !== undefined && data.version !== currentVersion)
      setTimeout(() => router.push(window.location.href), 15_000);

    if (data?.motd !== undefined) setMotd(data.motd);
  });

  return <div aria-roledescription="prop updater component" />;
}
