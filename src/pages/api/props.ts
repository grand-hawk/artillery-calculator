import Cache from 'stale-lru-cache';

import getProps, { PropsMaxAge } from '@/lib/server/getProps';

import type { Props } from '@/stores/props';
import type { NextApiRequest, NextApiResponse } from 'next';

const cache = new Cache({
  maxAge: PropsMaxAge,
  revalidate: (_, callback) => getProps().then(callback),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props>,
) {
  try {
    if (!cache.has('props')) cache.set('props', await getProps());
    const props = cache.get('props') as Props;

    res.status(200).json(props);
  } catch (error) {
    console.warn(error);

    res.status(500);
  }
}
