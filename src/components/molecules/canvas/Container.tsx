import Box from '@mui/joy/Box';
import React from 'react';

import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function CanvasContainer({ children }: PropsWithChildren) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [setWidth, setHeight] = useCanvasStore((s) => [
    s.setWidth,
    s.setHeight,
  ]);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function updateDimensions() {
      if (!element) return;

      // setWidth(element.offsetWidth);
      // Height is the more dominant value, set the width to height to make it 1:1 ratio
      setWidth(element.offsetHeight);
      setHeight(element.offsetHeight);
    }

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(element);
    return () => observer.disconnect();
  });

  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        aspectRatio: '1/1',
        maxHeight: '75svh',
        height: 'max-content',

        borderRadius: theme.radius.sm,
        overflow: 'hidden',
      })}
    >
      {children}
    </Box>
  );
}
