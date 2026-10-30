import type { Projectile } from '@/config/guns';

/*
  In-game gravity
*/
const G = 9.81;
/**
 * Air density (1.2 kg/m^3)
 */
const P = 1.2;
/**
 * Must match the game's firing table: the trajectory depends on the time step
 */
const FRAME_STEP = 1 / 60;
const SUBSTEP_STUDS = 20;
const FRAMES_PER_SAMPLE = 3;
const MIN_ANGLE = -90;
const MAX_ANGLE = 90;
/**
 * Height in meters below the gun at which a trajectory stops being traced
 */
const MIN_HEIGHT = -3000;
const REFINE_ITERATIONS = 20;
/**
 * Largest height miss in meters for a refined angle to count as a solution
 */
const REFINE_TOLERANCE = 1;

interface Flight {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  time: number;
}

interface Trajectory {
  xs: number[];
  ys: number[];
}

export interface Arc {
  /**
   * Elevation in degrees
   */
  elevation: number;
  /**
   * Time of flight in seconds
   */
  timeOfFlight: number;
}

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

function launch(v: number, elevation: number): Flight {
  const radians = (elevation * Math.PI) / 180;
  return {
    x: 0,
    y: 0,
    z: 0,
    vx: v * Math.cos(radians),
    vy: v * Math.sin(radians),
    vz: 0,
    time: 0,
  };
}

function isInFlight(flight: Flight, projectile: Projectile): boolean {
  return (
    flight.time <= (projectile.lifetime ?? Infinity) &&
    flight.y > MIN_HEIGHT &&
    flight.vx > 0
  );
}

function stepFrame(flight: Flight, projectile: Projectile) {
  const gravity = projectile.gravity ?? G;
  const dragConstant = projectile.dragConstant ?? 0;

  const speed = Math.hypot(flight.vx, flight.vy, flight.vz);
  const substeps = Math.round(
    Math.max((metersToStuds(speed) * FRAME_STEP) / SUBSTEP_STUDS, 1),
  );
  const dt = FRAME_STEP / substeps;

  for (let i = 0; i < substeps; i += 1) {
    flight.vy -= gravity * dt;

    const scale = Math.exp(
      -dragConstant * Math.hypot(flight.vx, flight.vy, flight.vz) * dt,
    );
    flight.vx *= scale;
    flight.vy *= scale;
    flight.vz *= scale;

    flight.x += flight.vx * dt;
    flight.y += flight.vy * dt;
    flight.z += flight.vz * dt;
  }

  flight.time += FRAME_STEP;
}

function hasLanded(flight: Flight, h: number): boolean {
  return flight.vy < 0 && flight.y < h;
}

/**
 * @param projectile Projectile
 * @param elevation Elevation in degrees
 * @param d Distance in meters
 * @param h Target height relative to the gun in meters
 * @returns Height miss at the target in meters (-Infinity if the projectile falls short, NaN if it despawns above the target) and the time of flight
 */
function shoot(
  projectile: Projectile,
  elevation: number,
  d: number,
  h: number,
): { miss: number; timeOfFlight: number } {
  const flight = launch(projectile.velocity, elevation);

  while (isInFlight(flight, projectile)) {
    const { x, y, time } = flight;
    stepFrame(flight, projectile);

    if (flight.x >= d) {
      const fraction = (d - x) / (flight.x - x);
      return {
        miss: y + (flight.y - y) * fraction - h,
        timeOfFlight: time + FRAME_STEP * fraction,
      };
    }
  }

  return { miss: flight.y < h ? -Infinity : NaN, timeOfFlight: NaN };
}

let cachedTrajectories:
  | { projectile: Projectile; trajectories: Trajectory[] }
  | undefined;

function getTrajectories(projectile: Projectile): Trajectory[] {
  if (cachedTrajectories?.projectile === projectile)
    return cachedTrajectories.trajectories;

  const trajectories: Trajectory[] = [];

  for (let elevation = MIN_ANGLE; elevation <= MAX_ANGLE; elevation += 1) {
    const flight = launch(projectile.velocity, elevation);
    const xs = [0];
    const ys = [0];

    for (let frame = 1; isInFlight(flight, projectile); frame += 1) {
      stepFrame(flight, projectile);

      if (frame % FRAMES_PER_SAMPLE === 0) {
        xs.push(flight.x);
        ys.push(flight.y);
      }
    }

    trajectories.push({ xs, ys });
  }

  cachedTrajectories = { projectile, trajectories };
  return trajectories;
}

function missOnTrajectory(
  { xs, ys }: Trajectory,
  d: number,
  h: number,
): number {
  const last = xs.length - 1;
  if (xs[last] < d) return ys[last] < h ? -Infinity : NaN;

  let low = 0;
  let high = last;
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2);
    if (xs[middle] < d) low = middle;
    else high = middle;
  }

  const fraction = (d - xs[low]) / (xs[high] - xs[low]);
  return ys[low] + (ys[high] - ys[low]) * fraction - h;
}

function refineArc(
  projectile: Projectile,
  shortElevation: number,
  longElevation: number,
  d: number,
  h: number,
): Arc | undefined {
  let short = shortElevation;
  let long = longElevation;

  for (let i = 0; i < REFINE_ITERATIONS; i += 1) {
    const middle = (short + long) / 2;
    if (shoot(projectile, middle, d, h).miss < 0) short = middle;
    else long = middle;
  }

  const elevation = (short + long) / 2;
  const { miss, timeOfFlight } = shoot(projectile, elevation, d, h);

  return Math.abs(miss) < REFINE_TOLERANCE
    ? { elevation, timeOfFlight }
    : undefined;
}

/**
 * @param projectile Projectile
 * @param d Distance in meters
 * @param h Target height relative to the gun in meters (default: 0)
 * @returns Low and high arcs, undefined when the projectile cannot reach the target on that arc
 */
export function calculateArcs(
  projectile: Projectile,
  d: number,
  h: number = 0,
): [Arc | undefined, Arc | undefined] {
  if (!(d > 0)) return [undefined, undefined];

  const misses = getTrajectories(projectile).map((trajectory) =>
    missOnTrajectory(trajectory, d, h),
  );

  let low: Arc | undefined;
  let high: Arc | undefined;

  for (let i = 1; i < misses.length; i += 1) {
    const elevation = MIN_ANGLE + i;

    if (!low && misses[i - 1] < 0 && misses[i] >= 0)
      low = refineArc(projectile, elevation - 1, elevation, d, h);
    if (misses[i - 1] >= 0 && misses[i] < 0)
      high = refineArc(projectile, elevation, elevation - 1, d, h) ?? high;
  }

  return [low, high];
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
 * @param projectile Projectile
 * @param elevation Elevation in degrees
 * @param h Target height relative to the gun in meters (default: 0)
 * @returns Estimated blast diameter in studs, NaN if the submunitions don't deploy before landing
 */
export function calculateSubmunitionBlastDiameter(
  projectile: Projectile,
  elevation: number,
  h: number = 0,
): number {
  const { submunitionAngularDispersion = 0, submunitionDeployFactor = 0.5 } =
    projectile;

  const flight = launch(projectile.velocity, elevation);
  const deploymentTime = ((flight.vy * 2) / G) * submunitionDeployFactor;

  while (flight.time < deploymentTime) {
    if (!isInFlight(flight, projectile) || hasLanded(flight, h)) return NaN;
    stepFrame(flight, projectile);
  }

  const halfAngle = (submunitionAngularDispersion * Math.PI) / 360;
  flight.vz = Math.hypot(flight.vx, flight.vy) * Math.sin(halfAngle);
  flight.vx *= Math.cos(halfAngle);
  flight.vy *= Math.cos(halfAngle);

  while (!hasLanded(flight, h)) {
    if (!isInFlight(flight, projectile)) return NaN;
    stepFrame(flight, projectile);
  }

  return 2 * metersToStuds(flight.z);
}

function landingRange(
  projectile: Projectile,
  elevation: number,
  h: number,
): number {
  const flight = launch(projectile.velocity, elevation);

  while (isInFlight(flight, projectile)) {
    stepFrame(flight, projectile);
    if (hasLanded(flight, h)) return flight.x;
  }

  return NaN;
}

/**
 * @param projectile Projectile
 * @param h Target height relative to the gun in meters (default: 0)
 * @returns Max range in meters
 */
export function calculateMaxRange(
  projectile: Projectile,
  h: number = 0,
): number {
  let maxRange = 0;
  let maxElevation = MIN_ANGLE;

  getTrajectories(projectile).forEach(({ xs, ys }, index) => {
    const last = xs.length - 1;
    if (ys[last] >= h) return;

    let i = last;
    while (i > 0 && ys[i - 1] < h) i -= 1;
    if (i === 0) return;

    const fraction = (ys[i - 1] - h) / (ys[i - 1] - ys[i]);
    const range = xs[i - 1] + (xs[i] - xs[i - 1]) * fraction;

    if (range > maxRange) {
      maxRange = range;
      maxElevation = MIN_ANGLE + index;
    }
  });

  let landed = maxElevation;
  let despawned = maxElevation + 1;
  if (!Number.isNaN(landingRange(projectile, despawned, h))) return maxRange;

  for (let i = 0; i < REFINE_ITERATIONS; i += 1) {
    const middle = (landed + despawned) / 2;
    const range = landingRange(projectile, middle, h);

    if (Number.isNaN(range)) {
      despawned = middle;
    } else {
      landed = middle;
      maxRange = Math.max(maxRange, range);
    }
  }

  return maxRange;
}
