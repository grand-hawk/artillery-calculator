import importedGuns from './importedGuns.json';

export interface Projectile {
  name: string;
  velocity: number;
  submunitions?: number;
  submunitionAngularDispersion?: number;
  submunitionDeployFactor?: number;
  explosiveMass?: number;
  capMultiplier?: number;
  blastMultiplier?: number;
}

export interface Gun {
  name: string;
  projectiles: Projectile[];
}

const customGuns: Record<string, Gun> = {
  mortar: {
    name: 'Mortar',
    projectiles: [
      {
        name: 'Medium Charge',
        velocity: 172,
        explosiveMass: 2,
      },
      {
        name: 'Low Charge',
        velocity: 125,
        explosiveMass: 2,
      },
      {
        name: 'High Charge',
        velocity: 225,
        explosiveMass: 2,
      },
    ],
  },

  ags17: {
    name: 'AGS-17',
    projectiles: [
      {
        name: 'VOG-17M',
        velocity: 185,
        explosiveMass: 0.0065,
      },
    ],
  },

  d30: {
    name: '122mm D-30',
    projectiles: [
      {
        name: '3BK-10',
        velocity: 726,
        explosiveMass: 1.67,
      },
      {
        name: '3OF56',
        velocity: 690,
        explosiveMass: 3.6,
      },
      {
        name: '3OF56 Low Charge',
        velocity: 200,
        explosiveMass: 3.6,
      },
    ],
  },

  vasilek: {
    name: '82mm 2B9 Vasilek',
    projectiles: [
      {
        name: 'Medium Charge',
        velocity: 175,
        explosiveMass: 2,
      },
      {
        name: 'Low Charge',
        velocity: 75,
        explosiveMass: 2,
      },
      {
        name: 'High Charge',
        velocity: 255,
        explosiveMass: 2,
      },
    ],
  },

  hellcannon: {
    name: 'Hell Cannon',
    projectiles: [
      {
        name: 'Propane',
        velocity: 130,
        explosiveMass: 30,
      },
    ],
  },

  ub32: {
    name: 'UB-32',
    projectiles: [
      {
        name: 'HEAT Rockets',
        velocity: 150,
        explosiveMass: 1.38,
      },
    ],
  },
};

export const guns = Object.entries({ ...customGuns, ...importedGuns })
  .sort((a, b) => a[1].name.localeCompare(b[1].name))
  .reduce(
    (acc, [key, gun]) => {
      acc[key] = gun;
      return acc;
    },
    {} as Record<string, Gun>,
  );
