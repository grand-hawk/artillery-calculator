// Gravity
const G = 9.81 * 1.8;

export function studsToMeters(s: number): number {
  return s * 0.35;
}

export function metersToStuds(m: number): number {
  return m / 0.35;
}

/**
 * @param d Studs
 * @param v Initial velocity
 */
export function calculateElevation(d: number, v: number): number {
  const angle = Math.asin((studsToMeters(d) * G) / v ** 2) / 2;
  return (angle * 180) / Math.PI;
}

export function calculateTimeOfFlight(e: number, v: number): number {
  const rad = (e * Math.PI) / 180;
  console.log(`${e}: ${rad}: ${(2 * v * Math.sin(rad)) / G}`);
  return (2 * v * Math.sin(rad)) / G;
}

export function calculateAzimuth(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
): number {
  return Math.abs(
    // 90° offset
    (90 + (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 360) % 360,
  );
}

export function calculateDistance(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function calculateMapSize(m: number, grids: number = 9): number {
  return metersToStuds(m) * grids;
}
