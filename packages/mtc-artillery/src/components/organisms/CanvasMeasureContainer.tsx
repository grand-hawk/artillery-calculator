import Box from '@mui/joy/Box';
import React from 'react';

import CanvasInnerContainer from '@/components/organisms/CanvasInnerContainer';
import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function CanvasMeasureContainer({
  children,
  float = 'center',
}: PropsWithChildren<{ float?: 'flex-start' | 'center' | 'flex-end' }>) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const setWidth = useCanvasStore((s) => s.setWidth);
  const setHeight = useCanvasStore((s) => s.setHeight);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function update() {
      const width = element?.offsetWidth as number;
      const height = element?.offsetHeight as number;

      const dimension = Math.max(width, height);

      setWidth(dimension);
      setHeight(dimension);
    }

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  });

  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        display: 'flex',
        justifyContent: float,

        overflow: 'hidden',
        aspectRatio: '1/1',

        '& .canvas-sheet': {
          borderRadius: theme.radius.sm,
          overflow: 'hidden',
        },
      })}
    >
      <CanvasInnerContainer>{children}</CanvasInnerContainer>
    </Box>
  );
}
