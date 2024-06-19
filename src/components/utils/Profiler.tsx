import React from 'react';

import onRenderCallback from '@/utils/onRenderCallback';

import type { PropsWithChildren } from 'react';

export default function Profiler({
  children,
  id,
}: PropsWithChildren<{ id: string }>) {
  return (
    <React.Profiler id={id} onRender={onRenderCallback}>
      {children}
    </React.Profiler>
  );
}
