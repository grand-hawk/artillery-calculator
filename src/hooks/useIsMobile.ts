import React from 'react';
import { UAParser } from 'ua-parser-js';
import { useMediaQuery } from 'usehooks-ts';

import { theme } from '@/components/utils/Theme';

export default function useIsMobile(): boolean {
  const [mobile, setMobile] = React.useState<boolean>(false);

  const isSmallScreen = !useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
  );

  React.useEffect(() => {
    const { userAgent } = window.navigator;

    const device = new UAParser(userAgent || '').getDevice();

    setMobile(device.type === 'mobile');
  }, [setMobile]);

  return isSmallScreen || mobile;
}
