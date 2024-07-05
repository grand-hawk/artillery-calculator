import Sheet from '@mui/joy/Sheet';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function CanvasInnerContainer({ children }: PropsWithChildren) {
  const isPanning = React.useRef<boolean>(false);

  const canvasWidth = useCanvasStore((s) => s.width);
  const canvasHeight = useCanvasStore((s) => s.height);
  const setZoom = useCanvasStore((s) => s.setZoom);

  const unoptimized = useCanvasStore((s) => s.unoptimized);
  const setUnoptimized = useCanvasStore((s) => s.setUnoptimized);

  return (
    <Sheet
      className="canvas-sheet"
      sx={{
        width: canvasWidth,
        height: canvasHeight,
      }}
    >
      <TransformWrapper
        alignmentAnimation={{
          animationTime: 350,
        }}
        doubleClick={{
          disabled: true,
        }}
        panning={{
          allowLeftClickPan: false,
          allowMiddleClickPan: true,
          allowRightClickPan: false,
          velocityDisabled: true,
        }}
        wheel={{
          step: 0.1,
        }}
        onPanningStart={() => {
          // Don't allow setting gun/target while panning
          isPanning.current = true;
        }}
        onPanningStop={() => {
          isPanning.current = false;
        }}
        onZoom={(wrapper) => {
          const zoom = wrapper.instance.transformState.scale;

          setZoom(zoom);

          // dont go back to the optimized image once the full image was requested
          if (!unoptimized && zoom > 1.25) setUnoptimized(true);
        }}
      >
        <TransformComponent>{children}</TransformComponent>
      </TransformWrapper>
    </Sheet>
  );
}
