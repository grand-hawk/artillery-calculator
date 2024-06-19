import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import useMap from '@/hooks/data/useMap';
import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function CanvasContainer({
  children,
  float = 'center',
}: PropsWithChildren<{ float?: 'flex-start' | 'center' | 'flex-end' }>) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isPanning = React.useRef<boolean>(false);
  const [isUnoptimized, setIsUnoptimized] = React.useState<boolean>(false);

  const map = useMap();
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
      <Sheet
        sx={{
          width: canvasStore.width,
          height: canvasStore.height,
        }}
      >
        <TransformWrapper
          onZoom={(wrapper) => {
            const zoom = wrapper.instance.transformState.scale;

            canvasStore.setZoom(zoom);

            // dont go back to the optimized image once the full image was requested
            if (zoom > 1.25) setIsUnoptimized(true);
          }}
          onPanningStart={() => {
            // Don't allow setting gun/target while panning
            isPanning.current = true;
          }}
          onPanningStop={() => {
            isPanning.current = false;
          }}
          panning={{
            allowLeftClickPan: false,
            allowMiddleClickPan: true,
            allowRightClickPan: false,
            velocityDisabled: true,
          }}
          doubleClick={{
            disabled: true,
          }}
          wheel={{
            step: 0.1,
          }}
          alignmentAnimation={{
            animationTime: 350,
          }}
        >
          <TransformComponent>
            <Image
              alt={map.name}
              src={`/images/webp/maps/${map.image}.webp`}
              width={canvasStore.width}
              height={canvasStore.height}
              unoptimized={isUnoptimized}
              priority
            />

            {children}
          </TransformComponent>
        </TransformWrapper>
      </Sheet>
    </Box>
  );
}
