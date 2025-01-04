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
 * @param d Distance in meters
 * @param v Initial velocity (m/s)
 * @param h Initial height in meters (default: 0)
 * @returns Elevation in degrees
 */
export function calculateLowElevation(
  d: number,
  v: number,
  h: number = 0,
): number {
  const squareRoot = Math.sqrt(v ** 4 - G * (G * d ** 2 + 2 * h * v ** 2));
  const radians = Math.atan((v ** 2 - squareRoot) / (G * d));
  return radians * (180 / Math.PI);
}

/**
 * @param d Distance in meters
 * @param v Initial velocity (m/s)
 * @param h Initial height in meters (default: 0)
 * @returns Elevation in degrees
 */
export function calculateHighElevation(
  d: number,
  v: number,
  h: number = 0,
): number {
  const squareRoot = Math.sqrt(v ** 4 - G * (G * d ** 2 + 2 * h * v ** 2));
  const radians = Math.atan((v ** 2 + squareRoot) / (G * d));
  return radians * (180 / Math.PI);
}

/**
 * @param e Elevation in degrees
 * @param v Velocity in m/s
 * @param d Distance in meters
 * @returns Time of flight in seconds
 */
export function calculateTimeOfFlight(e: number, v: number, d: number): number {
  const radians = (e * Math.PI) / 180;
  return d / (v * Math.cos(radians));
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
 * @param z1 Z of position 1
 * @param z2 Z of position 2
 * @returns Distance (universal)
 */
export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  z1: number = 0,
  z2: number = 0,
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * @param m Grid size in meters
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
 * @returns Blast diameter in studs
 */
export function calculateBlastDiameter(
  m: number,
  c: number = 1,
  b: number = 1,
  a: number = 0.07,
  d: number = P,
): number {
  const range = (1 / a) * ((m / d) ** (1 / 3) / 0.1);
  return Math.min(range, 500 * c) * b;
}

/**
 * @param m Total explosive mass in kg (distributed across submunitions)
 * @param n Number of submunitions
 * @param theta Angular dispersion in degrees
 * @param launchSpeed Initial speed of the projectile
 * @param elevation Elevation angle in degrees
 * @param submunitionDeployFactor Factor by which the total flight time is divided to determine deployment time (default: 0.5)
 * @param c Cap (500) multiplier (default: 1)
 * @param b Blast multiplier (default: 1)
 * @param a Explosive constant (default: 0.07)
 * @param d Air density (default: 1.2)
 * @returns Estimated blast diameter in studs
 */
export function calculateSubmunitionBlastDiameter(
  m: number,
  n: number,
  theta: number,
  launchSpeed: number,
  elevation: number,
  submunitionDeployFactor: number = 0.5,
  c: number = 1,
  b: number = 1,
  a: number = 0.07,
  d: number = 1.2,
): number {
  const elevationRadians = (elevation * Math.PI) / 180;
  const verticalVelocity = launchSpeed * Math.sin(elevationRadians);

  const totalFlightTime = (2 * verticalVelocity) / G;
  const deploymentTime = totalFlightTime * submunitionDeployFactor;

  const horizontalVelocity = launchSpeed * Math.cos(elevationRadians);
  const dispersionRadiusMeters =
    deploymentTime * horizontalVelocity * Math.tan((theta * Math.PI) / 360);
  const dispersionRadiusStuds = metersToStuds(dispersionRadiusMeters);

  const singleSubmunitionMass = m / n;
  const singleBlastDiameterStuds = calculateBlastDiameter(
    singleSubmunitionMass,
    c,
    b,
    a,
    d,
  );
  const singleBlastRadiusStuds = singleBlastDiameterStuds / 2;

  const estimatedRadiusStuds = Math.min(
    singleBlastRadiusStuds + dispersionRadiusStuds,
    500 * c,
  );
  const estimatedDiameterStuds = 2 * estimatedRadiusStuds * b;

  return estimatedDiameterStuds;
}

/**
 * @param v Initial velocity (m/s)
 * @param h Initial height in meters (default: 0)
 * @returns Max range diameter in meters
 */
export function calculateMaxRangeDiameter(v: number, h: number = 0): number {
  const a = -0.5 * G;
  const b = (v * Math.sqrt(2)) / 2;

  const discriminant = b ** 2 - 4 * a * h;
  const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

  return ((v * Math.sqrt(2)) / 2) * Math.max(t1, t2);
}
