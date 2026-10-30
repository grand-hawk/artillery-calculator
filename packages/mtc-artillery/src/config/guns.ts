export interface Projectile {
  name: string;
  velocity: number;
  /**
   * Gravitational acceleration in m/s^2
   */
  gravity?: number;
  /**
   * Quadratic drag constant in 1/m
   */
  dragConstant?: number;
  /**
   * Time in seconds before the projectile despawns
   */
  lifetime?: number;
  submunitions?: number;
  submunitionAngularDispersion?: number;
  submunitionDeployFactor?: number;
  explosiveMass?: number;
  /**
   * Blast radius in meters
   */
  blastRadius?: number;
}

export interface Gun {
  name: string;
  projectiles: Projectile[];
}
