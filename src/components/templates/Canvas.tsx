import Image from 'next/image';
import React from 'react';
import { isMobile } from 'react-device-detect';

import AbsoluteContainer from '@/components/atoms/canvas/AbsoluteContainer';
import CanvasMeasureContainer from '@/components/organisms/CanvasMeasureContainer';
import Profiler from '@/components/utils/Profiler';
import useGameMap from '@/hooks/data/useGameMap';
import useHeightmapZ from '@/hooks/data/useHeightmapZ';
import useProjectile from '@/hooks/data/useProjectile';
import { useCanvasStore } from '@/stores/canvas';
import { useDataStore } from '@/stores/data';
import {
  calculateBlastRange,
  calculateMaxRange,
  metersToStuds,
  studsToMeters,
} from '@/utils/math';

export interface Vector {
  x: number;
  y: number;
}

function Canvas() {
  const mobileMode = useDataStore((s) => s.mobileMode);

  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const projectile = useProjectile();
  const gameMap = useGameMap();

  const gun = useDataStore((s) => s.getGun());
  const setGun = useDataStore((s) => s.setGun);
  const target = useDataStore((s) => s.getTarget());
  const setTarget = useDataStore((s) => s.setTarget);

  const canvasStore = useCanvasStore();
  const canvasScale = 8;
  const scaledDimension = canvasStore.width * canvasScale;

  const [gunHeight] = useHeightmapZ();
  const blastRange: number | undefined =
    projectile.explosiveMass &&
    calculateBlastRange(
      projectile.explosiveMass,
      projectile.capMultiplier,
      projectile.blastMultiplier,
    );
  const blastRadius =
    blastRange && (blastRange / gameMap.size / 2) * scaledDimension;
  const maxRadius =
    (metersToStuds(
      calculateMaxRange(projectile.velocity, studsToMeters(gunHeight)),
    ) /
      gameMap.size) *
    scaledDimension;

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
    const gunX = gun.x * scaledDimension;
    const gunY = gun.y * scaledDimension;

    context.lineWidth = 20;
    context.strokeStyle = 'rgba(0, 50, 255, 0.5)';
    context.beginPath();
    context.arc(gunX, gunY, maxRadius, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = '#52a8ff';
    context.beginPath();
    context.arc(gunX, gunY, markerRadius, 0, Math.PI * 2);
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

      const x = event.offsetX / (canvasStore.width / canvasScale) / canvasScale;
      const y =
        event.offsetY / (canvasStore.height / canvasScale) / canvasScale;

      const updateGun = () => setGun(x, y);
      const updateTarget = () => setTarget(x, y);

      if (isMobile)
        switch (mobileMode) {
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
    <Profiler id="canvas-profiler">
      <CanvasMeasureContainer>
        <Image
          alt={gameMap.name}
          height={canvasStore.height}
          priority
          src={`/images/webp/maps/${gameMap.image}.webp`}
          unoptimized={canvasStore.unoptimized}
          width={canvasStore.width}
        />

        <AbsoluteContainer zIndex={2}>
          <canvas
            ref={ref}
            height={scaledDimension}
            style={{
              width: canvasStore.width,
              height: canvasStore.height,
            }}
            width={scaledDimension}
            onContextMenu={(event) => event.preventDefault()}
          />
        </AbsoluteContainer>
      </CanvasMeasureContainer>
    </Profiler>
  );
}

export default Canvas;
