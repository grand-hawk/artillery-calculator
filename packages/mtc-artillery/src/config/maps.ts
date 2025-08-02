import { calculateMapSize } from '@/utils/math';

export interface Heightmap {
  0: number;
  255: number;
}

export interface GameMap {
  heightmap?: Heightmap;
  image: string;
  inRotation?: boolean;
  name: string;
  size: number;
}

/* eslint sort-keys-fix/sort-keys-fix: "error" */
export const gameMaps: Record<string, GameMap> = {
  arctic_airbase: {
    heightmap: {
      0: 0,
      255: 566.8941650390625,
    },
    image: 'arctic_airbase',
    inRotation: true,
    name: 'Arctic Airbase',
    size: 449 * 9,
  },

  chernobyl_v2: {
    heightmap: {
      0: 0,
      255: 408.0989990234375,
    },
    image: 'chernobyl_v2',
    inRotation: true,
    name: 'Chernobyl',
    size: calculateMapSize(165),
  },

  cloudy_valley: {
    heightmap: {
      0: 0,
      255: 318.92401123046875,
    },
    image: 'cloudy_valley',
    inRotation: true,
    name: 'Cloudy Valley',
    size: calculateMapSize(116),
  },

  dustbowl: {
    heightmap: {
      0: 0,
      255: 362.07421875,
    },
    image: 'dustbowl',
    inRotation: true,
    name: 'Dustbowl',
    size: 3442,
  },

  dustbowl_ii: {
    heightmap: {
      0: -55.95123291015625,
      255: 506,
    },
    image: 'dustbowl_ii',
    inRotation: true,
    name: 'Dustbowl II',
    size: 6263,
  },

  fulvia_gap: {
    heightmap: {
      0: 0,
      255: 168.87933349609375,
    },
    image: 'fulvia_gap',
    inRotation: true,
    name: 'Fulvia Gap',
    size: 888 * 9,
  },

  gensokyo: {
    image: 'gensokyo',
    name: 'Gensokyo',
    size: calculateMapSize(122),
  },

  japan: {
    image: 'japan',
    name: 'Japan',
    size: calculateMapSize(122),
  },

  muddy_fields: {
    heightmap: {
      0: 6.65234375,
      255: 163.99659729003906,
    },
    image: 'muddy_fields',
    inRotation: true,
    name: 'Muddy Fields',
    size: calculateMapSize(240),
  },

  normandy: {
    heightmap: {
      0: 0,
      255: 116.07926940917969,
    },
    image: 'normandy_bocage',
    inRotation: true,
    name: 'Normandy Bocage',
    size: 664 * 9,
  },

  powerplant: {
    heightmap: {
      0: 110.25238037109375,
      255: 579.076416015625,
    },
    image: 'powerplant',
    inRotation: true,
    name: 'Powerplant',
    size: 3995,
  },

  radar_station: {
    heightmap: {
      0: 0,
      255: 311.19268798828125,
    },
    image: 'radar_station',
    inRotation: true,
    name: 'Radar Station',
    size: 708 * 9,
  },

  reactor: {
    image: 'reactor',
    name: 'Reactor (old)',
    size: calculateMapSize(207),
  },

  rohkstov: {
    heightmap: {
      0: -8,
      255: 487.0882873535156,
    },
    image: 'rohkstov',
    name: 'Rohkstov',
    size: 15010,
  },

  roinburg: {
    heightmap: {
      0: 0,
      255: 227.86021423339844,
    },
    image: 'roinburg',
    inRotation: true,
    name: 'Roinburg',
    size: calculateMapSize(142),
  },

  sandy_place: {
    heightmap: {
      0: 0,
      255: 119.748046875,
    },
    image: 'sandy_place',
    inRotation: true,
    name: 'Sandy Place',
    size: calculateMapSize(361),
  },

  snow_tundra: {
    image: 'snow_tundra',
    name: 'Snow Tundra',
    size: calculateMapSize(160),
  },

  sokolovka: {
    heightmap: {
      0: 0,
      255: 96.25390625,
    },
    image: 'sokolovka',
    inRotation: true,
    name: 'Sokolovka',
    size: 556 * 9,
  },

  testing: {
    image: 'testing',
    name: 'TESTING',
    size: 1113 * 9,
  },

  the_map: {
    heightmap: {
      0: -147.68359375,
      255: 159.07421875,
    },
    image: 'the_map',
    name: 'The Map',
    size: 22943,
  },

  villers_sommeil: {
    heightmap: {
      0: 19.85155487060547,
      255: 123.07566833496094,
    },
    image: 'villers_sommeil',
    inRotation: true,
    name: 'Villers-Sommeil',
    size: 2997,
  },

  zone_11: {
    heightmap: {
      0: 0,
      255: 250.1391906738281,
    },
    image: 'zone_11',
    name: 'Zone 11',
    size: calculateMapSize(324),
  },
} satisfies Record<string, GameMap>;

export type MapId = keyof typeof gameMaps;

export const defaultMapId: MapId = 'muddy_fields';
