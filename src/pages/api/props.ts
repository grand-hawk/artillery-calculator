import { getCachedProps } from '@/lib/server/getProps';

import type { Props } from '@/stores/props';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props>,
) {
  try {
    const props = await getCachedProps();
    res.status(200).json(props);
  } catch (error) {
    console.warn(error);

    res.status(500);
  }
}
