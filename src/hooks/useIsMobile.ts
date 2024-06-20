import React from 'react';
import { UAParser } from 'ua-parser-js';

export default function useIsMobile(): boolean {
  const [mobile, setMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { userAgent } = window.navigator;

    const device = new UAParser(userAgent || '').getDevice();

    setMobile(device.type === 'mobile');
  }, [setMobile]);

  return mobile;
}
