import React from 'react';
import { UAParser } from 'ua-parser-js';

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { userAgent } = window.navigator;

    const device = new UAParser(userAgent || '').getDevice();

    setIsMobile(device.type === 'mobile');
  }, [setIsMobile]);

  return isMobile;
}
