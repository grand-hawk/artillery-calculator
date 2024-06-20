/* eslint-disable no-underscore-dangle */

import React from 'react';

export default function useIsOverlay() {
  const [isOverlay, setIsOverlay] = React.useState<boolean>(false);

  React.useEffect(() => {
    if ('__TAURI__' in window) setIsOverlay(true);
  }, [setIsOverlay]);

  return isOverlay;
}
