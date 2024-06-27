import getMotd from '@/lib/server/getMotd';
import getVersion from '@/lib/server/getVersion';

import type { Props } from '@/stores/props';

export default async function getProps(): Promise<Props> {
  return {
    version: getVersion(),
    motd: await getMotd(),
  };
}
