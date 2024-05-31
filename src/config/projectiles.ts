export interface Projectile {
  name: string;
  velocity: number;
  explosiveMass?: number;
  capMultiplier?: number;
  blastMultiplier?: number;
}

export interface Gun {
  name: string;
  projectiles: Projectile[];
}

export const guns: Record<string, Gun> = {
  t34: {
    name: 'T34 Calliope',
    projectiles: [
      {
        name: 'M61',
        velocity: 619,
      },
      {
        name: 'M48',
        velocity: 463,
      },
      {
        name: 'M8 Rocket',
        velocity: 260,
        explosiveMass: 1.95,
      },
    ],
  },

  rszo: {
    name: 'RSZO series',
    projectiles: [
      {
        name: 'Rocketetet',
        velocity: 150,
        explosiveMass: 1,
      },
    ],
  },

  sau2: {
    name: 'SAU-2',
    projectiles: [
      {
        name: '3OF25 Medium Charge',
        velocity: 400,
        explosiveMass: 7.65,
      },
      {
        name: 'Smoke Shell',
        velocity: 200,
      },
      {
        name: '3OF25',
        velocity: 665,
        explosiveMass: 7.65,
      },
      {
        name: 'BR-540B',
        velocity: 600,
      },
      {
        name: '3VO28 Canister Shot',
        velocity: 200,
        explosiveMass: 1,
      },
      {
        name: '3OF25 Low Charge',
        velocity: 200,
        explosiveMass: 7.65,
      },
    ],
  },

  m109: {
    name: 'M109',
    projectiles: [
      {
        name: 'M107',
        velocity: 684,
        explosiveMass: 9.14,
      },
      {
        name: 'M110 Smoke Grenade',
        velocity: 172,
      },
      {
        name: 'M107 Low Charge',
        velocity: 172,
        explosiveMass: 9.14,
      },
      {
        name: 'M107 Medium Charge',
        velocity: 225,
        explosiveMass: 9.14,
      },
    ],
  },

  grad: {
    name: 'BM-21 Grad',
    projectiles: [
      {
        name: '9M22/M21 HE-Frag',
        velocity: 150,
        explosiveMass: 6.4,
      },
    ],
  },

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

  sturmtiger: {
    name: 'Sturmtiger',
    projectiles: [
      {
        name: '38cm R Spgr.4581',
        velocity: 150,
      },
    ],
  },

  panzerwerfer: {
    name: 'Panzerwerfer-15',
    projectiles: [
      {
        name: 'HE Rocket',
        velocity: 340,
      },
    ],
  },

  d30: {
    name: '122mm D-30',
    projectiles: [
      {
        name: '3BK-10',
        velocity: 726,
      },
      {
        name: '3OF56',
        velocity: 690,
      },
      {
        name: '3OF56 Low Charge',
        velocity: 200,
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

  speedsta: {
    name: 'Speedsta',
    projectiles: [
      {
        name: 'BruhHe',
        velocity: 230,
      },
    ],
  },

  hellcannon: {
    name: 'Hell Cannon',
    projectiles: [
      {
        name: 'Propane',
        velocity: 130,
      },
    ],
  },

  tos1a: {
    name: 'TOS-1A BM-1',
    projectiles: [
      {
        name: 'Incendiary',
        velocity: 150,
      },
      {
        name: 'Thermobaric',
        velocity: 150,
        explosiveMass: 1.2,
        blastMultiplier: 2,
      },
    ],
  },

  karlgerat: {
    name: 'Karl-Gerät',
    projectiles: [
      {
        name: 'Schwere Betongranate',
        velocity: 150,
      },
    ],
  },
};
