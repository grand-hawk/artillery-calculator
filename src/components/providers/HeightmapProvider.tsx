import React from 'react';

import Profiler from '@/components/utils/Profiler';
import { maps } from '@/config/maps';
import { useDataStore } from '@/stores/data';

import type { PropsWithChildren } from 'react';

export const heightmapCanvasId = 'heightmap-provider';

export default function HeightmapProvider({ children }: PropsWithChildren) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!map.heightmap) return;

    const context = canvas.getContext('2d')!;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();

    function onImageLoad() {
      context.drawImage(image, 0, 0);
    }

    image.addEventListener('load', onImageLoad);

    image.src = `/images/webp/heightmaps/${map.image}.webp`;

    return () => {
      image.removeEventListener('load', onImageLoad);
    };
  }, [map]);

  return (
    <>
      <Profiler id="heightmap-canvas-profiler">
        <canvas
          ref={canvasRef}
          height={map.heightmap?.height ?? 0}
          id={heightmapCanvasId}
          style={{ display: 'none' }}
          width={map.heightmap?.width ?? 0}
        />
      </Profiler>

      {children}
    </>
  );
}
