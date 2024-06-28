import React from 'react';

import { heightmapCanvasId } from '@/components/providers/HeightmapProvider';

export default function useHeightmapContext() {
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null,
  );

  React.useEffect(() => {
    if (context) return;

    const element = document.getElementById(
      heightmapCanvasId,
    ) as HTMLCanvasElement | null;
    if (!element) return;

    // https://html.spec.whatwg.org/multipage/canvas.html#dom-canvasrenderingcontext2dsettings-willreadfrequently
    const retrievedContext = element.getContext('2d', {
      willReadFrequently: true,
      desynchronized: true,
    }) as CanvasRenderingContext2D;

    setContext(retrievedContext);
  }, [context]);

  return context;
}
