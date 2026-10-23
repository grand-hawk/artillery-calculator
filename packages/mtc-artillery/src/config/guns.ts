export interface Projectile {
  name: string;
  velocity: number;
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
