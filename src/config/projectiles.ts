export interface Gun {
  name?: string;
}

export const guns: Record<string, Gun> = {
  't34-calliope': {
    name: 'T34 Calliope',
  },

  rszo: {
    name: 'RSZO series',
  },

  'sau-2': {
    name: 'SAU-2',
  },

  m109: {
    name: 'M109',
  },

  grad: {
    name: 'BM-21 Grad',
  },

  mortar: {
    name: 'Mortar',
  },

  sturmtiger: {
    name: 'Sturmtiger',
  },

  panzerwerfer: {
    name: 'Panzerwerfer-15',
  },

  propane: {
    name: 'Hell Cannon',
  },

  'd-30': {
    name: '122mm D-30',
  },

  '2b9': {
    name: '82mm 2B9 Vasilek',
  },

  speedsta: {
    name: 'Speedsta',
  },
};

export interface Projectile {
  name: string;
  velocity: number;
  gun?: Gun;
}

export const projectiles: Projectile[] = [
  // T34 Calliope
  {
    name: 'M61',
    velocity: 619,
    gun: guns['t34-calliope'],
  },
  {
    name: 'M48',
    velocity: 463,
    gun: guns['t34-calliope'],
  },
  {
    name: 'M8 Rocket',
    velocity: 260,
    gun: guns['t34-calliope'],
  },

  // RSZO-1 series
  {
    name: 'Rocketetet',
    velocity: 150,
    gun: guns.rszo,
  },

  // SAU-2
  {
    name: 'BR-540B',
    velocity: 600,
    gun: guns['sau-2'],
  },
  {
    name: '3OF25 Low Charge',
    velocity: 125,
    gun: guns['sau-2'],
  },
  {
    name: '3OF25',
    velocity: 665,
    gun: guns['sau-2'],
  },

  // M109
  {
    name: 'M107',
    velocity: 684,
    gun: guns.m109,
  },
  {
    name: 'M110',
    velocity: 172,
    gun: guns.m109,
  },
  {
    name: 'M107 Low Charge',
    velocity: 172,
    gun: guns.m109,
  },
  {
    name: 'M107 Medium Charge',
    velocity: 225,
    gun: guns.m109,
  },

  // BM-21 Grad
  {
    name: '9M22/M21 HE-Frag',
    velocity: 150,
    gun: guns.grad,
  },

  // Mortar
  {
    name: 'Medium Charge',
    velocity: 172,
    gun: guns.mortar,
  },
  {
    name: 'Low Charge',
    velocity: 125,
    gun: guns.mortar,
  },
  {
    name: 'High Charge',
    velocity: 225,
    gun: guns.mortar,
  },

  // Sturmtiger
  {
    name: '38cm R Spgr.4581',
    velocity: 150,
    gun: guns.sturmtiger,
  },

  // Panzerwerfer-15
  {
    name: 'HE Rocket',
    velocity: 340,
    gun: guns.panzerwerfer,
  },

  // Hell Cannon
  {
    name: 'Propane',
    velocity: 130,
    gun: guns.propane,
  },

  // 122mm D-30
  {
    name: 'HE',
    velocity: 690,
    gun: guns['d-30'],
  },
  {
    name: 'HEAT',
    velocity: 726,
    gun: guns['d-30'],
  },

  // 82mm 2B9 Vasilek
  {
    name: 'Medium Charge',
    velocity: 175,
    gun: guns['2b9'],
  },
  {
    name: 'Low Charge',
    velocity: 75,
    gun: guns['2b9'],
  },
  {
    name: 'High Charge',
    velocity: 255,
    gun: guns['2b9'],
  },

  // Speedsta
  {
    name: 'BruhHe',
    velocity: 230,
    gun: guns.speedsta,
  },
];
