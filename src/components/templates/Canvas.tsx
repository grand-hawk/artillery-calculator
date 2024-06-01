import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import AbsoluteContainer from '@/components/atoms/canvas/AbsoluteContainer';
import CanvasContainer from '@/components/organisms/CanvasContainer';
import { maps } from '@/config/maps';
import { guns } from '@/config/projectiles';
import { useCanvasStore } from '@/stores/canvas';
import { useDataStore } from '@/stores/data';
import { calculateBlastRange } from '@/utils/math';

import type { MobileModeMutable } from '@/components/molecules/configuration/MobileMode';

export interface Vector {
  x: number;
  y: number;
}

function Canvas({
  isMobile,
  mobileMode,
}: {
  isMobile: boolean;
  mobileMode: MobileModeMutable;
}) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const isPanning = React.useRef<boolean>(false);
  const [isUnoptimized, setIsUnoptimized] = React.useState<boolean>(false);

  const projectileData = useDataStore((s) => s.projectile);
  const projectile =
    guns[projectileData.gunKey].projectiles[projectileData.index];

  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];

  const [target, gun] = useDataStore((s) => [s.getTarget(), s.getGun()]);
  const [setTarget, setGun] = useDataStore((s) => [s.setTarget, s.setGun]);

  const canvasStore = useCanvasStore();
  const canvasScale = 8;
  const scaledDimension = canvasStore.width * canvasScale;

  const blastRange: number | undefined =
    projectile.explosiveMass &&
    calculateBlastRange(
      projectile.explosiveMass,
      projectile.capMultiplier,
      projectile.blastMultiplier,
    );
  const blastRadius =
    blastRange && (blastRange / (map.size || 0) / 2) * scaledDimension;

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, scaledDimension, scaledDimension);

    // Line
    context.lineWidth = (1.75 * canvasScale) / canvasStore.zoom;
    context.strokeStyle = '#FFF';
    context.beginPath();
    context.moveTo(gun.x * scaledDimension, gun.y * scaledDimension);
    context.lineTo(target.x * scaledDimension, target.y * scaledDimension);
    context.stroke();

    const markerRadius = Math.max(
      (8 * canvasScale) / canvasStore.zoom,
      4 * (canvasScale / 2),
    );

    // Gun
    context.fillStyle = '#52a8ff';
    context.beginPath();
    context.arc(
      gun.x * scaledDimension,
      gun.y * scaledDimension,
      markerRadius,
      0,
      Math.PI * 2,
    );
    context.fill();

    // Target
    const targetX = target.x * scaledDimension;
    const targetY = target.y * scaledDimension;

    if (blastRadius) {
      context.fillStyle = 'rgba(176, 64, 64, 0.65)';
      context.beginPath();
      context.arc(targetX, targetY, blastRadius, 0, Math.PI * 2);
      context.fill();
    }

    context.fillStyle = '#ff6666';
    context.beginPath();
    context.arc(targetX, targetY, markerRadius, 0, Math.PI * 2);
    context.fill();

    function clickListener(event: MouseEvent) {
      event.preventDefault();

      if (isPanning.current) return;

      const x = event.offsetX / (canvasStore.width / canvasScale) / canvasScale;
      const y =
        event.offsetY / (canvasStore.height / canvasScale) / canvasScale;

      const updateGun = () => setGun(x, y);
      const updateTarget = () => setTarget(x, y);

      if (isMobile)
        switch (mobileMode?.current) {
          case 'gun':
            updateGun();
            break;
          case 'target':
            updateTarget();
            break;
        }
      else
        switch (event.button) {
          // LMB
          case 0:
            updateGun();
            break;
          // RMB
          case 2:
            updateTarget();
            break;
        }
    }

    canvas.addEventListener('mousedown', clickListener);
    return () => canvas.removeEventListener('mousedown', clickListener);
  });

  return (
    <CanvasContainer>
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
              src={`/images/webp/${map.image}.webp`}
              width={canvasStore.width}
              height={canvasStore.height}
              unoptimized={isUnoptimized}
              priority
            />

            <AbsoluteContainer zIndex={2}>
              <canvas
                ref={ref}
                width={scaledDimension}
                height={scaledDimension}
                onContextMenu={(event) => event.preventDefault()}
                style={{
                  width: canvasStore.width,
                  height: canvasStore.height,
                }}
              />
            </AbsoluteContainer>
          </TransformComponent>
        </TransformWrapper>
      </Sheet>
    </CanvasContainer>
  );
}

export default Canvas;
