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
  const pendingImageRef = React.useRef<HTMLImageElement | null>(null);

  const [size, setSize] = React.useState<number>(1024);
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
    pendingImageRef.current = null;

    const image = new Image();
    image.crossOrigin = 'anonymous';

    function onImageLoad() {
      pendingImageRef.current = image;
      setSize(Math.max(image.width, image.height));
    }

    image.addEventListener('load', onImageLoad);

    image.src = getHeightmapImageUrl(gameMap.image);

    return () => {
      image.removeEventListener('load', onImageLoad);
    };
  }, [mounted, gameMap]);

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const image = pendingImageRef.current;
    if (!canvas || !image) return;
    if (canvas.width !== image.width || canvas.height !== image.height) {
      return;
    }

    const context = canvas.getContext('2d', {}) as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);

    pendingImageRef.current = null;

    console.log('[Heightmap provider]', 'drew:', gameMap.name);
  }, [size, gameMap]);

  return (
    <>
      <Profiler id="heightmap-canvas-profiler">
        <canvas
          ref={canvasRef}
          height={size}
          id={heightmapCanvasId}
          width={size}
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
