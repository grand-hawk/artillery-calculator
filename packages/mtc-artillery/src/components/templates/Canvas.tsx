import Image from 'next/image';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useShallow } from 'zustand/shallow';

import AbsoluteContainer from '@/components/atoms/canvas/AbsoluteContainer';
import CanvasMeasureContainer from '@/components/organisms/CanvasMeasureContainer';
import Profiler from '@/components/utils/Profiler';
import useElevation from '@/hooks/data/useElevation';
import useGameMap from '@/hooks/data/useGameMap';
import useHeightmapZ from '@/hooks/data/useHeightmapZ';
import useProjectile from '@/hooks/data/useProjectile';
import { useCanvasStore } from '@/stores/canvas';
import { useDataStore } from '@/stores/data';
import drawBlastRadius from '@/utils/canvas/drawBlastRadius';
import drawGun from '@/utils/canvas/drawGun';
import drawLine from '@/utils/canvas/drawLine';
import drawTarget from '@/utils/canvas/drawTarget';
import {
  calculateBlastDiameter,
  calculateMaxRangeDiameter,
  calculateSubmunitionBlastDiameter,
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
  const elevation = useElevation();
  const [gunHeight] = useHeightmapZ();

  const gun = useDataStore(useShallow((s) => s.getGun()));
  const setGun = useDataStore((s) => s.setGun);
  const target = useDataStore(useShallow((s) => s.getTarget()));
  const setTarget = useDataStore((s) => s.setTarget);

  const canvasStore = useCanvasStore();
  const canvasScale = 8;
  const scaledDimension = canvasStore.width * canvasScale;

  let blastDiameter: number | undefined;
  if (
    projectile.explosiveMass &&
    projectile.submunitions &&
    projectile.submunitionAngularDispersion
  ) {
    const arcs = [
      calculateSubmunitionBlastDiameter(
        projectile.explosiveMass,
        projectile.submunitionAngularDispersion,
        projectile.velocity,
        elevation[0],
        projectile.submunitionDeployFactor,
      ),
      calculateSubmunitionBlastDiameter(
        projectile.explosiveMass,
        projectile.submunitionAngularDispersion,
        projectile.velocity,
        elevation[1],
        projectile.submunitionDeployFactor,
      ),
    ].filter((number) => !Number.isNaN(number));

    const average = arcs.reduce((a, b) => a + b, 0) / arcs.length;

    if (average > 0) blastDiameter = average;
  }
  if (projectile.explosiveMass && !blastDiameter)
    blastDiameter = calculateBlastDiameter(
      projectile.explosiveMass,
      projectile.capMultiplier,
      projectile.blastMultiplier,
    );

  const blastRadius =
    blastDiameter && (blastDiameter / gameMap.size / 2) * scaledDimension;

  const maxRadius =
    (metersToStuds(
      calculateMaxRangeDiameter(projectile.velocity, studsToMeters(gunHeight)),
    ) /
      gameMap.size) *
    scaledDimension;

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, scaledDimension, scaledDimension);

    const markerRadius = Math.max(
      (8 * canvasScale) / canvasStore.zoom,
      4 * (canvasScale / 2),
    );

    drawBlastRadius(context, target, scaledDimension, blastRadius);
    drawLine(
      context,
      canvasScale,
      canvasStore.zoom,
      gun,
      target,
      scaledDimension,
    );
    drawGun(context, gun, maxRadius, scaledDimension, markerRadius);
    drawTarget(context, target, scaledDimension, markerRadius);

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
  }, [
    blastRadius,
    canvasStore.height,
    canvasStore.width,
    canvasStore.zoom,
    gun,
    maxRadius,
    mobileMode,
    scaledDimension,
    setGun,
    setTarget,
    target,
  ]);

  return (
    <Profiler id="canvas-profiler">
      <CanvasMeasureContainer>
        <Image
          alt={gameMap.name}
          height={canvasStore.height}
          priority
          quality={90}
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
