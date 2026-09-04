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

    console.log('[Heightmap provider]', 'drawing:', gameMap.name);

    const image = new Image();
    image.crossOrigin = 'anonymous';

    function onImageLoad() {
      // Resize and draw the heightmap imperatively on the canvas element.
      //
      // We intentionally do NOT drive canvas.width/height through React
      // state. The previous implementation called setSize() after drawing,
      // which triggered a React re-render that updated the canvas width/height
      // attributes — and assigning canvas.width/height always clears the
      // bitmap. This discarded the heightmap entirely, so every terrain
      // height read returned zero and the height difference was always 0,
      // causing shells to miss on any map with elevation changes.
      //
      // By resizing via the DOM ref and immediately drawing in the same
      // callback, the canvas is never cleared between resize and draw, and
      // React never touches the dimensions because they are not bound to
      // state.
      const newSize = Math.max(image.width, image.height);
      canvas.width = newSize;
      canvas.height = newSize;

      const context = canvas.getContext('2d', {}) as CanvasRenderingContext2D;

      // Stretch the heightmap to fill the square canvas. Non-square
      // heightmap images would otherwise leave blank regions that read
      // back as minimum height (pixel value 0).
      context.drawImage(image, 0, 0, newSize, newSize);

      console.log('[Heightmap provider]', 'drew:', gameMap.name);
    }

    image.addEventListener('load', onImageLoad);
    image.src = getHeightmapImageUrl(gameMap.image);

    return () => {
      image.removeEventListener('load', onImageLoad);
    };
  }, [mounted, gameMap]);

  return (
    <>
      <Profiler id="heightmap-canvas-profiler">
        {/*
          Canvas dimensions are managed imperatively in the effect above.
          They are intentionally NOT bound to React state — see the comment
          in onImageLoad for why. The fixed 1024 initial size only matters
          before the first heightmap image loads.
        */}
        <canvas
          ref={canvasRef}
          height={1024}
          id={heightmapCanvasId}
          width={1024}
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
