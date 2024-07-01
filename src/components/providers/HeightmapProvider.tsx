import React from 'react';

import Profiler from '@/components/utils/Profiler';
import useGameMap from '@/hooks/data/useGameMap';

import type { PropsWithChildren } from 'react';

export const heightmapCanvasId = 'heightmap-provider';

export default function HeightmapProvider({ children }: PropsWithChildren) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const gameMap = useGameMap();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!gameMap.heightmap) return;

    const context = canvas.getContext('2d')!;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();

    function onImageLoad() {
      context.drawImage(image, 0, 0);
    }

    image.addEventListener('load', onImageLoad);

    image.src = `/images/webp/heightmaps/${gameMap.image}.webp`;

    return () => {
      image.removeEventListener('load', onImageLoad);
    };
  }, [gameMap]);

  return (
    <>
      <Profiler id="heightmap-canvas-profiler">
        <canvas
          ref={canvasRef}
          height={gameMap.heightmap?.height ?? 0}
          id={heightmapCanvasId}
          style={{ display: 'none' }}
          width={gameMap.heightmap?.width ?? 0}
        />
      </Profiler>

      {children}
    </>
  );
}
