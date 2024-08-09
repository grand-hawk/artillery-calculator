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
    name: 'M109(A6)',
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
        velocity: 180,
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

  tos1a: {
    name: 'TOS-1A BM-1',
    projectiles: [
      {
        name: 'Incendiary',
        velocity: 180,
      },
      {
        name: 'Thermobaric',
        velocity: 180,
        explosiveMass: 3,
        blastMultiplier: 4,
      },
      {
        name: 'Blast fragmentation',
        velocity: 180,
        explosiveMass: 10,
        blastMultiplier: 1,
      },
    ],
  },

  '2s19': {
    name: '2S19',
    projectiles: [
      {
        name: 'BP-540',
        velocity: 655,
        explosiveMass: 3,
      },
      {
        name: 'OF-72',
        velocity: 864,
        explosiveMass: 9,
      },
      {
        name: 'OF-72 Low Charge',
        velocity: 200,
        explosiveMass: 9,
      },
      {
        name: 'OF-72 Medium Charge',
        velocity: 500,
        explosiveMass: 9,
      },
      {
        name: 'OF-91',
        velocity: 864,
        explosiveMass: 11,
      },
      {
        name: 'OF-91 Low Charge',
        velocity: 200,
        explosiveMass: 11,
      },
      {
        name: 'OF-91 Medium Charge',
        velocity: 500,
        explosiveMass: 11,
      },
      {
        name: 'OF-91 Proxy Fuze',
        velocity: 500,
        explosiveMass: 864,
      },
    ],
  },

  '2S7': {
    name: '2S7',
    projectiles: [
      {
        name: '2VG11',
        velocity: 864,
        explosiveMass: 10,
      },
      {
        name: '3VOF34',
        velocity: 864,
        explosiveMass: 30,
      },
      {
        name: '3VOF42',
        velocity: 200,
        explosiveMass: 30,
      },
      {
        name: '3V016',
        velocity: 200,
        explosiveMass: 0.23,
      },
    ],
  },

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

  sturmtiger: {
    name: 'Sturmtiger',
    projectiles: [
      {
        name: '38cm R Spgr.4581',
        velocity: 150,
        explosiveMass: 125,
      },
    ],
  },

  panzerwerfer: {
    name: 'Panzerwerfer-15',
    projectiles: [
      {
        name: 'HE Rocket',
        velocity: 340,
        explosiveMass: 2.15,
      },
    ],
  },

  speedsta: {
    name: 'Speedsta',
    projectiles: [
      {
        name: 'BruhHe',
        velocity: 230,
        explosiveMass: 25.01,
      },

      {
        name: 'BruhHeSh',
        velocity: 230,
        explosiveMass: 9,
      },
    ],
  },

  karlgerat: {
    name: 'Karl-Gerät',
    projectiles: [
      {
        name: 'Schwere Betongranate',
        velocity: 150,
        explosiveMass: 289,
        capMultiplier: 2,
      },
    ],
  },

  centurion5: {
    name: 'Centurion Mk 5 AVRE',
    projectiles: [
      {
        name: 'L33A1',
        velocity: 259,
        explosiveMass: 30.6,
      },
    ],
  },
};
