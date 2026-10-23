import React from 'react';

import type { Gun } from '@/config/guns';
import type { PropsWithChildren } from 'react';

export const GunsContext = React.createContext<Record<string, Gun>>({});

export default function GunsProvider({
  children,
  guns,
}: PropsWithChildren<{ guns: Record<string, Gun> }>) {
  return <GunsContext.Provider value={guns}>{children}</GunsContext.Provider>;
}
