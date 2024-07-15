import type { Vector } from '@/components/templates/Canvas';

export default async function drawTarget(
  context: CanvasRenderingContext2D,
  target: Vector,
  scaledDimension: number,
  markerRadius: number,
) {
  const targetX = target.x * scaledDimension;
  const targetY = target.y * scaledDimension;

  context.fillStyle = '#ff6666';
  context.beginPath();
  context.arc(targetX, targetY, markerRadius, 0, Math.PI * 2);
  context.fill();
}
