/*
  In-game gravity
*/
const G = 9.8 * 1.8;
/**
 * Air density (1.2 kg/m^3)
 */
const P = 1.2;

/**
 * @param s Studs
 * @returns Meters
 */
export function studsToMeters(s: number): number {
  return s / (5 / 1.8);
}

/**
 * @param m Meters
 * @returns Studs
 */
export function metersToStuds(m: number): number {
  return m * (5 / 1.8);
}

/**
 * @param d Studs
 * @param v Initial velocity
 * @returns Elevation in degrees
 */
export function calculateElevation(d: number, v: number): number {
  const angle = Math.asin((studsToMeters(d) * G) / v ** 2) / 2;
  return (angle * 180) / Math.PI;
}

/**
 *
 * @param e Elevation in degrees
 * @param v Velocity in m/s
 * @returns Time of flight in seconds
 */
export function calculateTimeOfFlight(e: number, v: number): number {
  const radians = (e * Math.PI) / 180;
  return (2 * v * Math.sin(radians)) / G;
}

/**
 * @param x1 X of position 1
 * @param y1 Y of position 1
 * @param x2 X of position 2
 * @param y2 Y of position 2
 * @returns Azimuth, 0-360(359) in degrees
 */
export function calculateAzimuth(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const radians = Math.atan2(y2 - y1, x2 - x1);
  return Math.abs(
    // 90° offset
    (90 + (radians * 180) / Math.PI + 360) % 360,
  );
}

/**
 * @param x1 X of position 1
 * @param y1 Y of position 1
 * @param x2 X of position 2
 * @param y2 Y of position 2
 * @returns Distance (universal)
 */
export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * @param m Meters
 * @param grids Grids (default: 9)
 * @returns Map size in studs
 */
export function calculateMapSize(m: number, grids: number = 9): number {
  return metersToStuds(m) * grids;
}

/**
 * @param m Explosive mass in kg
 * @param c Cap (500) multiplier (default: 1)
 * @param b Blast multiplier (default: 1)
 * @param d Air density (default: 1.2)
 * @param a Explosive constant (default: 0.07)
 */
export function calculateBlastRange(
  m: number,
  c: number = 1,
  b: number = 1,
  a: number = 0.07,
  d: number = P,
): number {
  const range = (1 / a) * ((m / d) ** (1 / 3) / 0.1);
  return Math.min(range, 500 * c) * b;
}
