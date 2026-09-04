import React from 'react';

import Profiler from '@/components/utils/Profiler';
import useGameMap from '@/hooks/data/useGameMap';
import { getHeightmapImageUrl } from '@/utils/images';

import type { PropsWithChildren } from 'react';

export const heightmapCanvasId = 'heightmap-provider';

export default function HeightmapProvider({
  children,
  ...props
}: PropsWithChildren<React.ComponentProps<'canvas'>>) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [size, setSize] = React.useState<{ height: number; width: number }>({
    height: 1024,
    width: 1024,
  });
  const [pendingImage, setPendingImage] =
    React.useState<HTMLImageElement | null>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);

  const gameMap = useGameMap();

  // prevent rendering during mount,
  // ensure that the true map was set by zustand
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted) return;
    if (!gameMap.heightmap) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('[Heightmap provider]', 'loading:', gameMap.name);

    const context = canvas.getContext('2d', {}) as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setPendingImage(null);

    const image = new Image();
    image.crossOrigin = 'anonymous';

    function onImageLoad() {
      setSize({ height: image.height, width: image.width });
      setPendingImage(image);
    }

    image.addEventListener('load', onImageLoad);

    image.src = getHeightmapImageUrl(gameMap.image);

    return () => {
      image.removeEventListener('load', onImageLoad);
    };
  }, [mounted, gameMap]);

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pendingImage) return;
    if (canvas.width !== size.width || canvas.height !== size.height) return;

    const context = canvas.getContext('2d', {}) as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(pendingImage, 0, 0);

    console.log('[Heightmap provider]', 'drew:', gameMap.name);
  }, [size, pendingImage, gameMap]);

  return (
    <>
      <Profiler id="heightmap-canvas-profiler">
        <canvas
          ref={canvasRef}
          height={size.height}
          id={heightmapCanvasId}
          width={size.width}
          {...props}
          style={{
            display: 'none',
            ...(props.style ?? {}),
          }}
        />
      </Profiler>

      {children}
    </>
  );
}
