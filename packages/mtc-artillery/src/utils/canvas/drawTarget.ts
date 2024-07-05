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
    context.fillStyle = 'rgba(176, 64, 64, 0.65)';
    context.beginPath();
    context.arc(targetX, targetY, blastRadius, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = '#ff6666';
  context.beginPath();
  context.arc(targetX, targetY, markerRadius, 0, Math.PI * 2);
  context.fill();
}
