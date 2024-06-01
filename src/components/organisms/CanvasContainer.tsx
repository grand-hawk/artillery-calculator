import Box from '@mui/joy/Box';
import React from 'react';

import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function CanvasContainer({
  children,
  float = 'center',
}: PropsWithChildren<{ float?: 'flex-start' | 'center' | 'flex-end' }>) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const canvasStore = useCanvasStore();

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function update() {
      const width = element?.offsetWidth as number;
      const height = element?.offsetHeight as number;

      const smallest = Math.min(width, height);

      canvasStore.setWidth(smallest);
      canvasStore.setHeight(smallest);
    }

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  });

  return (
    <Box
      ref={ref}
      aria-roledescription="container"
      sx={(theme) => ({
        display: 'flex',
        justifyContent: float,

        overflow: 'hidden',

        '& > *': {
          borderRadius: theme.radius.sm,
          overflow: 'hidden',
        },
      })}
    >
      {children}
    </Box>
  );
}
