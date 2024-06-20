import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import AbsoluteContainer from '@/components/atoms/canvas/AbsoluteContainer';
import useMap from '@/hooks/data/useMap';
import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function CanvasInnerContainer({ children }: PropsWithChildren) {
  const isPanning = React.useRef<boolean>(false);
  const [isUnoptimized, setIsUnoptimized] = React.useState<boolean>(false);

  const map = useMap();

  const canvasWidth = useCanvasStore((s) => s.width);
  const canvasHeight = useCanvasStore((s) => s.height);
  const setZoom = useCanvasStore((s) => s.setZoom);

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
          if (!isUnoptimized && zoom > 1.25) setIsUnoptimized(true);
        }}
      >
        <TransformComponent>
          <Image
            alt={map.name}
            height={canvasHeight}
            priority
            src={`/images/webp/maps/${map.image}.webp`}
            unoptimized={isUnoptimized}
            width={canvasWidth}
          />

          <AbsoluteContainer zIndex={2}>{children}</AbsoluteContainer>
        </TransformComponent>
      </TransformWrapper>
    </Sheet>
  );
}
