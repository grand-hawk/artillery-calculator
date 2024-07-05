import Cache from 'stale-lru-cache';

import getMotd from '@/lib/server/getMotd';
import getVersion from '@/lib/server/getVersion';

import type { Props } from '@/stores/props';

export const PropsMaxAge = 120;

async function getProps(): Promise<Props> {
  return {
    version: getVersion(),
    motd: await getMotd(),
  };
}

export const cache = new Cache({
  maxAge: PropsMaxAge,
  revalidate: (_, callback) => getProps().then(callback),
});

export async function getCachedProps(): Promise<Props> {
  if (!cache.has('props')) cache.set('props', await getProps());
  const props = cache.get('props') as Props;
  return props;
}

export default getProps;
