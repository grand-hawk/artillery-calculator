import type { Vector } from '@/components/templates/Canvas';

export default async function drawGun(
  context: CanvasRenderingContext2D,
  gun: Vector,
  maxRadius: number,
  scaledDimension: number,
  markerRadius: number,
) {
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
}
