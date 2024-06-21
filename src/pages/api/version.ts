import getVersion from '@/utils/getVersion';

import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  version: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({
    version: getVersion(),
  });
}
