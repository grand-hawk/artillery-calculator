import React from 'react';

import { heightmapCanvasId } from '@/components/utils/HeightmapProvider';

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
    setContext(element.getContext('2d', { willReadFrequently: true })!);
  }, [context]);

  return context;
}
