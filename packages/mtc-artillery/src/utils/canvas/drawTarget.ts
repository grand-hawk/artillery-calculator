import { useSettingsStore } from '@/stores/settings';

import type { Vector } from '@/components/templates/Canvas';

export default async function drawTarget(
  context: CanvasRenderingContext2D,
  target: Vector,
  scaledDimension: number,
  markerRadius: number,
  blastRadius?: number,
) {
  const targetX = target.x * scaledDimension;
  const targetY = target.y * scaledDimension;

  if (blastRadius) {
    const { legacyBlastRadius: useLegacyBlastRadius } =
      useSettingsStore.getState();

    const baseColor = 'rgba(176, 64, 64, 0.65)';

    if (useLegacyBlastRadius) context.fillStyle = baseColor;
    else {
      const gradient = context.createRadialGradient(
        targetX,
        targetY,
        0,
        targetX,
        targetY,
        blastRadius,
      );

      // 0 = center, 1 = edge
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.25, baseColor);
      gradient.addColorStop(1, 'rgba(176, 64, 64, 0.0)');

      context.fillStyle = gradient;
    }

    context.beginPath();
    context.arc(targetX, targetY, blastRadius, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = '#ff6666';
  context.beginPath();
  context.arc(targetX, targetY, markerRadius, 0, Math.PI * 2);
  context.fill();
}
