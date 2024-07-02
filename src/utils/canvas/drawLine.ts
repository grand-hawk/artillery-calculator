import type { Vector } from '@/components/templates/Canvas';

export default async function drawLine(
  context: CanvasRenderingContext2D,
  canvasScale: number,
  zoom: number,
  gun: Vector,
  target: Vector,
  scaledDimension: number,
) {
  context.lineWidth = (1.75 * canvasScale) / zoom;
  context.strokeStyle = '#FFF';
  context.beginPath();
  context.moveTo(gun.x * scaledDimension, gun.y * scaledDimension);
  context.lineTo(target.x * scaledDimension, target.y * scaledDimension);
  context.stroke();
}
